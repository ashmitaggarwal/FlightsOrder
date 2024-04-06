import {FlightData, OrdersData} from "../types/types";

const SERVER_URL = "/json";

// Group results by a specified field.
export const groupBy = (arr: any[], property: string) => {
  return arr.reduce((acc, curr) => {
    acc[curr[property]] = [...(acc[curr[property]] || []), curr];
    return acc;
  }, {});
};

export const assignActivePageClass = (current: string, page: string):string =>
  current === page ? "active" : "";


// Return flights in an object based on day numbers.
export const getFlightsBasedOnDays = (arr:FlightData[]) =>
  arr.reduce((acc:any, curr:FlightData) => {
    if (!acc[curr.day]) {
      acc[curr.day] = [curr];
    } else {
      acc[curr.day].push(curr);
    }

    return acc;
  }, {});

// Service that gets all flight data and returns grouped them by day.
export const getFlights = () => {
  let url = `${SERVER_URL}/flights.json`;

  // Return the Flights data, separated by day.
  return fetch(url).then(async (response) => {
    const data = await response.json();

    return groupBy(data, "day");
  });
};

function fetchDestinationsAndFilter(jsonData:OrdersData[], filterDestination:any) {
  const jsdata:any = {};
  for (const order in jsonData) {
    if (jsonData.hasOwnProperty(order)) {
      const destination = jsonData[order].destination;
      if (destination === filterDestination) {
        jsdata[order] = { destination };
      }
    }
  }
  return jsdata;
}

// Service that returns all order data.
export const getAllOrders = (destinations: any[]) => {
  return destinations.map((destination) => {
    return new Promise(async (resolve, reject) => {
      let ordersUrl = `${SERVER_URL}/orders.json?destination=${destination}`;

      const ordersRes = await fetch(ordersUrl).then((response) =>
          response.json()
      );

      if (ordersRes) {
        resolve({ [destination]: fetchDestinationsAndFilter(ordersRes,destination) });
      } else {
        reject("Error.");
      }
    }).catch(() => {
      console.log("Error.");
    });
  });
};

// Get the Order and Flight data, then combine the Order data with the Flights to meet the requirements
// of the correct number of orders per flight.
export const getCombinedFlightData = async (destinations: any[]) => {
  const orders = await Promise.all(getAllOrders(destinations));
  const flights = await getFlights();
  let flightsWithOrders: any;
  if (orders && flights) {
    const objOrders:any = orders.reduce((acc:any, curr:any) => {
      const key = Object.keys(curr)[0];
      acc[key] = curr[key];

      return acc;
    }, {});

    flightsWithOrders = { ...flights };

    for (const flight in flightsWithOrders) {
      for (const arrival of destinations) {
        const findFlight:FlightData = flightsWithOrders[flight]?.find(
          (flight: { arrival_city: string; }) => {
            return flight.arrival_city === arrival;
          }
        );

        // @ts-ignore
        findFlight.orders = Object.fromEntries(
            Object.entries(objOrders[arrival]).slice(0, 20)
        );
      }
    }

    if (flightsWithOrders) {
      flightsWithOrders = Object.keys(flightsWithOrders).reduce((acc, curr) => {
        // @ts-ignore
        acc.push(...flightsWithOrders[curr]);

        return acc;
      }, []);
    }
  }

  // @ts-ignore
  return flightsWithOrders;
};
