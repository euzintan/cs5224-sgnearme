import {
  createTransport, queryTransport, 
  createEducation, queryEducation,
  createSports, querySports
} from "./repository.js"

export async function ormCreateTransport(name, type, xcoord, ycoord, description) {
  try {
    return await createTransport([{ name, type, xcoord, ycoord, description }])
  } catch (err) {
    // console.error(err);
    return { err: err.result };
  }
}

export async function ormCreateManyTransport(arrayofobjects) {
  try {
    await createTransport(arrayofobjects)
    return true
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQueryTransport(xgte, xlte, ygte, ylte) {
  // https://stackoverflow.com/questions/14559200/how-to-exclude-one-particular-field-from-a-collection-in-mongoose
  return await queryTransport({ xcoord: { $gte: xgte, $lte: xlte }, ycoord: { $gte: ygte, $lte: ylte } })
}

export async function ormCreateManyEducation(arrayofobjects) {
  try {
    await createEducation(arrayofobjects)
    return true
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQueryEducation(xgte, xlte, ygte, ylte) {
  return await queryEducation({ xcoord: { $gte: xgte, $lte: xlte }, ycoord: { $gte: ygte, $lte: ylte } })
}

export async function ormCreateManySports(arrayofobjects) {
  try {
    await createSports(arrayofobjects)
    return true
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQuerySports(xgte, xlte, ygte, ylte) {
  return await querySports({ xcoord: { $gte: xgte, $lte: xlte }, ycoord: { $gte: ygte, $lte: ylte } })
}