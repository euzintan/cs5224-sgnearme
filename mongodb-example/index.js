import {
  ormCreateManyTransport, ormQueryTransport, ormRemoveTransport,
  ormCreateManySports, ormQuerySports, ormRemoveSports,
  ormCreateManyEducation, ormQueryEducation, ormRemoveEducation,
} from "./model/orms.js"


function createTransportObject(name, type, xcoord, ycoord, description) {
  return { name, type, xcoord, ycoord, description }
}

function createEducationObject(name, type, address, xcoord, ycoord, description) {
  return { name, type, address, xcoord, ycoord, description }
}

function createSportsObject(name, type, address, xcoord, ycoord, description) {
  return { name, type, address, xcoord, ycoord, description }
}

const tranportArray = [
  ["transport", "Bus", 1, 2, "hello"],
  ["transport2", "Bus", 2, 3],
  ["transport3", "Taxi", 3, 4, "description 3"],
  ["transport4", "MRT", 4, 5],
  ["transport5", "invalid", 5, 6],
]
const transportObjectArray = tranportArray.map(x => createTransportObject(...x));

const educationArray = [
  ["education", "Primary", "address", 1, 2, "hello"],
  ["education2", "Secondary", "address1", 2, 3],
  ["education3", "University", "address2", 3, 4, "description 3"],
  ["education4", "Polytechnic", "address3", 4, 5],
  ["education5", "Gym", "address4", 5, 6],
]
const educationObjectArray = educationArray.map(x => createEducationObject(...x));

const sportsArray = [
  ["sports", "Swim", "address", 1, 2, "hello"],
  ["sports2", "Gym", "address1", 2, 3],
  ["sports3", "Stadium", "address2", 3, 4, "description 3"],
  ["sports4", "Tennis", "address3", 4, 5],
  ["sports5", "MRT", "address4", 5, 6],
]
const sportsObjectArray = sportsArray.map(x => createSportsObject(...x));


/* --------------------------------- Insert --------------------------------- */


let insertTransportPromise = ormCreateManyTransport(transportObjectArray)
let insertEducationPromise = ormCreateManyEducation(educationObjectArray)
let insertSportsPromise = ormCreateManySports(sportsObjectArray)
let results = await Promise.all([insertTransportPromise, insertEducationPromise, insertSportsPromise])
console.log(results)



/* ---------------------------------- Query --------------------------------- */

// query WHERE 0 < xcoord < 2 AND 1 < ycoord < 3

let transportQueryPromise = ormQueryTransport(0, 2, 1, 3)
let educationQueryPromise = ormQueryEducation(0, 2, 1, 3)
let sportsQueryPromise = ormQuerySports(0, 2, 1, 3)
let queryResults = await Promise.all([transportQueryPromise, educationQueryPromise, sportsQueryPromise])
console.log(queryResults)


/* --------------------------------- Delete --------------------------------- */

// deletes rows from db
// deletes all rows if no arguments

// let transportRemovePromise = ormRemoveTransport()
// let educationRemovePromise = ormRemoveEducation()
// let sportsRemovePromise = ormRemoveSports()
// let removeResults = await Promise.all([transportRemovePromise, educationRemovePromise, sportsRemovePromise])
// console.log(removeResults)




process.on('exit', function (code) {
  return console.log(`exiting the code ${code}`);
});
process.exit(0)