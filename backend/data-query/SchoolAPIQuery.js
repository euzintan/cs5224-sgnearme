import fetch from "node-fetch";
import { EducationModel } from "../model/schemas.js";

export async function updateSchoolDB() {
  await EducationModel.deleteMany({});
  const updateArr = [];
  const response = await fetch(
    "https://data.gov.sg/api/action/datastore_search?resource_id=ede26d32-01af-4228-b1ed-f05c45a1d8ee"
  );
  const data = await response.json();
  for (let school of data.result?.records) {
    updateArr.push(parseIntoSchoolObject(school));
  }
  Promise.all(updateArr).then((x) => EducationModel.insertMany(x));
}

async function parseIntoSchoolObject(school) {
  let returnObj = {};

  returnObj.name = school.school_name;
  returnObj.type = school.mainlevel_code;
  returnObj.address = school.address;

  let oneMapResponse = await fetch(
    `https://developers.onemap.sg/commonapi/search?searchVal=${school.postal_code}&returnGeom=Y&getAddrDetails=Y`
  );
  let oneMapData = await oneMapResponse.json();

  if (!oneMapData.found) {
    oneMapResponse = await fetch(
      `https://developers.onemap.sg/commonapi/search?searchVal=${school.school_name}&returnGeom=Y&getAddrDetails=Y`
    );
    oneMapData = await oneMapResponse.json();
  }

  returnObj.xcoord = Number.parseFloat(oneMapData.results[0]?.LATITUDE);
  returnObj.ycoord = Number.parseFloat(oneMapData.results[0]?.LONGITUDE);

  return returnObj;
}
