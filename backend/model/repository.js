import mongoose from "mongoose";
import { TransportModel, EducationModel, SportsModel } from "./schemas.js";
import * as dotenv from "dotenv";
import { updateSchoolDB } from "../data-query/SchoolAPIQuery.js";

dotenv.config({ path: "../model/.env" });
let mongoDB = process.env.DB_CLOUD_URI;

await connect().catch((err) => console.log(err));
async function connect() {
  await mongoose.connect(mongoDB);
  console.log("db connected");
}

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/* -------------------------------------------------------------------------- */
/*                                  Transport                                 */
/* -------------------------------------------------------------------------- */

export async function createTransport(params) {
  // const arr = { name: 'Star Wars', type: 'Bus', xcoord: 10, ycoord: 101}
  const arr = [{ name: "Star Wass", type: "Bus", xcoord: 10, ycoord: 101 }];

  console.log(params);
  console.log("YO");
  console.log(arr);
  // https://mongoosejs.com/docs/api/model.html#model_Model-insertMany
  // ordered=false : insert all the documents it can and report errors later
  // return TransportModel.insertMany(arr, function(error, docs) {console.log("LLL")});
  return TransportModel.insertMany(params, { ordered: false });
  // return new TransportModel(arr)
}

export async function queryTransport(filter) {
  // https://stackoverflow.com/questions/42336077/how-to-do-a-range-query-in-mongoose
  // https://mongoosejs.com/docs/tutorials/lean.html
  return TransportModel.find(filter).select(["-_id", "-__v"]).lean();
}

export async function removeTransport(params) {
  return TransportModel.deleteMany(params);
}

/* -------------------------------------------------------------------------- */
/*                                  Education                                 */
/* -------------------------------------------------------------------------- */

export async function createEducation(params) {
  return EducationModel.insertMany(params, { ordered: false });
}

export async function queryEducation(filter) {
  return EducationModel.find(filter).select(["-_id", "-__v"]).lean();
}

export async function removeEducation(params) {
  return EducationModel.deleteMany(params);
}

/* -------------------------------------------------------------------------- */
/*                                   Sports                                   */
/* -------------------------------------------------------------------------- */

export async function createSports(params) {
  console.log("insert many: ", params);
  return SportsModel.insertMany(params, { ordered: false });
}

export async function querySports(filter) {
  return SportsModel.find(filter).select(["-_id", "-__v"]).lean();
}

export async function removeSports(params) {
  return SportsModel.deleteMany(params);
}
