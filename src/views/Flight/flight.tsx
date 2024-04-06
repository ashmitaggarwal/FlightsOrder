import { useContext, useEffect, useState } from "react";
import { FlightData, TransportlyContext } from "../../types/types";
import { getCombinedFlightData } from "../../utils/utils";
import { DESTINATIONS } from "../../utils/constants";
import { useLocation } from 'react-router-dom';
import './flight..css'
// @ts-ignore
const Flight = ( ) => {
  let location = useLocation();
  const  flight_number  = location.search.split('=')[1];
  const { combinedFlightOrderData, setCombinedFlightOrderData } =
    useContext(TransportlyContext);
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();

  // If there's no combined data available, then fetch it.
  useEffect(() => {
    if (!combinedFlightOrderData) {
      const getData = async () => {
        const res = await getCombinedFlightData(DESTINATIONS);

        setCombinedFlightOrderData(res);
      };

      getData();
    } else {
      const res = combinedFlightOrderData.find(
        (flight: { flight_number: any; }) => flight.flight_number.toString() === flight_number.toString()
      );

      setSelectedFlight(res);
    }
  }, [combinedFlightOrderData, setCombinedFlightOrderData, flight_number]);

  return (
    <div className="flight">
      {selectedFlight && (
        <>
          <h2>
            Flight {flight_number}: {selectedFlight.departure_city} &#10132;{" "}
            {selectedFlight.arrival_city}
          </h2>
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
              {Object.keys(selectedFlight?.orders).map((order, key) => {
                const { day, departure_city, arrival_city } = selectedFlight;
                return (
                  <tr key={key}>
                    <td>{order}</td>
                    <td>{flight_number}</td>
                    <td>{departure_city}</td>
                    <td>{arrival_city}</td>
                    <td>{day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Flight;
