import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query";
import routes from "./routes/routes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import {
    FlightData,
    TransportlyContext,
    TransportlyContextValues,
} from "./types/types";
import './App.css'

const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [flightOrderData, setFlightOrderData] = useState([]);
    const [combinedFlightOrderData, setCombinedFlightOrderData] = useState<
        FlightData[] | null
    >(null);

    // @ts-ignore
    const values: TransportlyContextValues = useMemo(
        () => ({
            isLoading,
            setIsLoading,
            flightOrderData,
            setFlightOrderData,
            combinedFlightOrderData,
            setCombinedFlightOrderData,
        }),
        [
            isLoading,
            setIsLoading,
            flightOrderData,
            setFlightOrderData,
            combinedFlightOrderData,
            setCombinedFlightOrderData,
        ]
    );

    return (
        <TransportlyContext.Provider value={values}>
            <QueryClientProvider client={queryClient}>
                    <div className="App">
                        <Header />

                        <section>
                            <article>
                                <Routes>
                                    {(routes.map((route, key) => {
                                        return (
                                            <Route
                                                key={key}
                                                path={route.path}
                                                element={route.component}
                                            />
                                        );
                                    }))}
                                </Routes>
                            </article>
                        </section>
                        <Footer />
                    </div>
            </QueryClientProvider>
        </TransportlyContext.Provider>
    );
};

export default App;
