import mongoose from "mongoose";

var Schema = mongoose.Schema;

let TransportModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["BUS", "MRT", "TAXI"],
  },
  xcoord: {
    type: Number,
    required: true,
  },
  ycoord: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

let EducationModelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["PRIMARY", "SECONDARY", "JUNIOR COLLEGE", "MIXED LEVELS"],
  },
  address: {
    type: String,
    required: true,
  },
  xcoord: {
    type: Number,
    required: true,
  },
  ycoord: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

let SportsModelSchema = new Schema({
  type: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  xcoord: {
    type: Number,
    required: true,
  },
  ycoord: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

export let TransportModel = mongoose.model(
  "TransportModel",
  TransportModelSchema
);
export let EducationModel = mongoose.model(
  "EducationModel",
  EducationModelSchema
);
export let SportsModel = mongoose.model("SportsModel", SportsModelSchema);
