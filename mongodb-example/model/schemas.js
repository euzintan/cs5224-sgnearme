import mongoose from 'mongoose';

var Schema = mongoose.Schema

let TransportModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Bus", "MRT", "Taxi"]
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
})

let EducationModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Primary", "Secondary", "University", "Junior College", "Polytechnic"]
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
})

let SportsModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Swim", "Gym", "Stadium", "Tennis", "BasketBall"]
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
})

export let TransportModel = mongoose.model('TransportModel', TransportModelSchema)
export let EducationModel = mongoose.model('EducationModel', EducationModelSchema)
export let SportsModel = mongoose.model('SportsModel', SportsModelSchema)