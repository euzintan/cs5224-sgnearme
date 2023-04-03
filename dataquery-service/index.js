import mongoose from "mongoose";
import { updateSchoolDB } from "./data-query/SchoolAPIQuery.js";
import { updateSportsDB } from "./data-query/SportsAPIQuery.js";
import { updateTransportDB } from "./data-query/TransportAPIQuery.js";
import * as dotenv from "dotenv";
import { TransportModel } from "./model/schemas.js";

dotenv.config({ path: "data-query.env" });
let mongoDB = process.env.DB_CLOUD_URI;

await connect().catch((err) => console.log(err));
async function connect() {
  await mongoose.connect(mongoDB);
  console.log("db connected");
}

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

await Promise.resolve(updateSchoolDB(), updateSportsDB(), updateTransportDB());
