import {
  createTransport,
  queryTransport,
  removeTransport,
  createEducation,
  queryEducation,
  removeEducation,
  createSports,
  querySports,
  removeSports,
} from "./repository.js";

/* -------------------------------------------------------------------------- */
/*                                  Transport                                 */
/* -------------------------------------------------------------------------- */

export async function ormCreateManyTransport(objectsArray) {
  try {
    console.log(objectsArray);
    await createTransport(objectsArray);
    // newUser.save();
    return true;
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQueryTransport(xgte, xlte, ygte, ylte) {
  // https://stackoverflow.com/questions/14559200/how-to-exclude-one-particular-field-from-a-collection-in-mongoose
  return await queryTransport({
    xcoord: { $gte: xgte, $lte: xlte },
    ycoord: { $gte: ygte, $lte: ylte },
  });
}

export async function ormRemoveTransport(params) {
  return await removeTransport(params);
}

/* -------------------------------------------------------------------------- */
/*                                  Education                                 */
/* -------------------------------------------------------------------------- */

export async function ormCreateManyEducation(objectsArray) {
  try {
    await createEducation(objectsArray);
    return true;
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQueryEducation(xgte, xlte, ygte, ylte) {
  return await queryEducation({
    xcoord: { $gte: xgte, $lte: xlte },
    ycoord: { $gte: ygte, $lte: ylte },
  });
}

export async function ormRemoveEducation(params) {
  return await removeEducation(params);
}

/* -------------------------------------------------------------------------- */
/*                                   Sports                                   */
/* -------------------------------------------------------------------------- */

export async function ormCreateManySports(objectsArray) {
  try {
    await createSports(objectsArray);
    return true;
  } catch (err) {
    // console.error(err.result);
    return { err: err.result };
  }
}

export async function ormQuerySports(xgte, xlte, ygte, ylte) {
  return await querySports({
    xcoord: { $gte: xgte, $lte: xlte },
    ycoord: { $gte: ygte, $lte: ylte },
  });
}

export async function ormRemoveSports(params) {
  return await removeSports(params);
}
