import fetch from "node-fetch";
import { TransportModel } from "../model/schemas.js";

export async function updateTransportDB() {
  await TransportModel.deleteMany();
  updateTaxi();
  updateBus();
}

async function updateTaxi() {
  let updateArr = [];
  const response = await fetch(
    "http://datamall2.mytransport.sg/ltaodataservice/TaxiStands"
  );
  const data = await response.json();

  for (let taxi of data.value) {
    updateArr.push(parseIntoTaxiObject(taxi));
  }
  await TransportModel.insertMany(updateArr);
}

async function updateBus() {
  let updateArr = [];
  const response = await fetch(
    "http://datamall2.mytransport.sg/ltaodataservice/BusStops"
  );
  const data = await response.json();

  for (let bus of data.value) {
    updateArr.push(parseIntoBusObject(bus));
  }
  await TransportModel.insertMany(updateArr).catch((err) =>
    console.log("Error: ", err)
  );
}

function parseIntoBusObject(bus) {
  let returnObj = {};

  returnObj.name = bus.Description;
  returnObj.xcoord = bus.Latitude;
  returnObj.ycoord = bus.Longitude;
  returnObj.type = "BUS";

  return returnObj;
}

function parseIntoTaxiObject(taxi) {
  let returnObj = {};

  returnObj.name = taxi.Name;
  returnObj.xcoord = taxi.Latitude;
  returnObj.ycoord = taxi.Longitude;
  returnObj.type = "TAXI";

  return returnObj;
}
