import { useEffect, useContext, useState} from "react";
import Spinner from "../../components/Spinner/spinner.component";
import {TransportlyContext} from "../../types/types";
import {getCombinedFlightData, getFlightsBasedOnDays} from "../../utils/utils";
import {DESTINATIONS} from "../../utils/constants";
import { useNavigate } from 'react-router-dom';
import './flights.css'

// @ts-ignore
const Flights = () => {
  const navigate = useNavigate()

  const {
    isLoading,
    setIsLoading,
    combinedFlightOrderData,
    setCombinedFlightOrderData,
  } = useContext(TransportlyContext);
  const [flightsBasedOnDays, setFlightsBasedOnDays]: any = useState({});

  // If there's no combined data available, then fetch it.
  useEffect(() => {
    if (!combinedFlightOrderData) {
      setIsLoading(true);

      const getData = async () => {
        const res = await getCombinedFlightData(DESTINATIONS);

        setCombinedFlightOrderData(res);
        setIsLoading(false);
      };

      getData();
    }
  }, [
    isLoading,
    setIsLoading,
    combinedFlightOrderData,
    setCombinedFlightOrderData,
  ]);

  useEffect(() => {
    if (combinedFlightOrderData) {
      const res = getFlightsBasedOnDays(combinedFlightOrderData);

      setFlightsBasedOnDays(res);
    }
  }, [combinedFlightOrderData]);
  return (
      <div className="flights">
        {isLoading && <Spinner position="floatCenter"/>}

        {!isLoading && Object.keys(flightsBasedOnDays).length > 0 && (
            <div>
              <h3 className="title">Flights</h3>
              <button
                  className="border primary viewOrderSchedule"
                  type="button"
                  title="VIEW ORDER SCHEDULE"
                  onClick={() => navigate("/orders")}
              >
                VIEW ORDER SCHEDULE
              </button>
              {Object.keys(flightsBasedOnDays).map((day, tableKey) => {
                // @ts-ignore
                return (
                    <div className="flights-table-container" key={tableKey}>
                      <h4 className="title">Scheduled flights for Day {day}</h4>
                      <table>
                        <thead>
                        <tr>
                          <th>Flight number</th>
                          <th>Departure</th>
                          <th>Arrival</th>
                          <th>View Flight</th>
                        </tr>
                        </thead>
                        <tbody>
                        {flightsBasedOnDays[day].map((flight: any, key: number) => {
                      const { flight_number, departure_city, arrival_city } =
                        flight;

                      return (
                        <tr key={key}>
                          <td>{flight_number}</td>
                          <td>{departure_city}</td>
                          <td>{arrival_city}</td>
                          <td>
                            <button
                              type="button"
                              className="border"
                              onClick={() =>
                                navigate(
                               "/flight?flight_number="+flight_number,
                                )
                              }
                            >
                              View flight
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Flights;
