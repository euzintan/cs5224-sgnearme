import * as dotenv from "dotenv";
import parseKML from "parse-kml";
import { SportsModel } from "../model/schemas.js";

dotenv.config({ path: "data-query.env" });
let sportsApi = process.env.SPORTS_API;
console.log("api:", sportsApi);

export async function updateSportsDB() {
  // Refreshes the database by deleting all documents
  await SportsModel.deleteMany({});
  let json = await parseKML.toJson(sportsApi);
  let updateArr = [];
  for (let feature of json?.features) {
    updateArr.push(parseIntoSportsObject(feature));
  }
  await SportsModel.insertMany(updateArr);
}

function parseIntoSportsObject(feature) {
  let returnObj = {};
  returnObj.xcoord = feature.geometry?.coordinates[0][0][1];
  returnObj.ycoord = feature.geometry?.coordinates[0][0][0];
  returnObj.type = feature.properties.FACILITIES?.split("/");
  returnObj.address = feature.properties.ROAD_NAME;
  returnObj.description = feature.properties.CONTACT_NO;
  return returnObj;
}
