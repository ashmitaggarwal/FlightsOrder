import {TransportlyContext} from "../../types/types";
import {DESTINATIONS} from "../../utils/constants";
import {getCombinedFlightData} from "../../utils/utils";
import {useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import './orders.css'

// @ts-ignore
const Orders = () => {
    const navigate = useNavigate()
    const {combinedFlightOrderData, setCombinedFlightOrderData} =
        useContext(TransportlyContext);


    useEffect(() => {
        const getData = async () => {
            const res = await getCombinedFlightData(DESTINATIONS);
            setCombinedFlightOrderData(res);
        };

        if (!combinedFlightOrderData) {
            getData();
        }
    }, [combinedFlightOrderData,setCombinedFlightOrderData]);
    return (
        <div className="orders">
            <h3 className="title">Orders</h3>
            <button
                className="border primary viewFlightSchedule"
                type="button"
                title="VIEW FLIGHT SCHEDULE"
                onClick={() => navigate("/flights")}
            >
                VIEW FLIGHT SCHEDULE
            </button>
            <table>
                <thead>
                <tr>
                    <th>Order #</th>
                    <th>Flight</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Day</th>
                </tr>
                </thead>
                <tbody>
                {combinedFlightOrderData?.map((flight) => {
                    const {day, flight_number, departure_city, arrival_city, orders} =
                        flight;
                    return Object.keys(orders)?.map((order, key) => {
                        // const {id} = order;

                        return (
                            <tr key={key}>
                                <td>{order}</td>
                                <td>{flight_number}</td>
                                <td>{departure_city}</td>
                                <td>{arrival_city}</td>
                                <td>{day}</td>
                            </tr>
                        );
                    });
                })}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
