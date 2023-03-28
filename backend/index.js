import express from "express";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

import {
  getTransport,
  addTransport,
} from "./controller/queryresultcontroller.js";

const router = express.Router();

// const port = process.env.ENV === "PROD" ? process.env.PORT : 8001
const port = 8001;

app.get("/", (req, res) => {
  res.send("Hello World from resultquery-service");
});

// Controller will contain all the Routes
router.post("/add", addTransport);
router.get("/transport", getTransport);

app.use("/api/query", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
app.listen(port, () =>
  console.log(`userqueryservice listening on port ${port}`)
);

// Export our app for testing purposes
export default app;
