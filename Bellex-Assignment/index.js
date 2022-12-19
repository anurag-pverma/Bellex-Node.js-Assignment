import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";

import connect from "./Database/db.js";
const app = express();
import router from "./Routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.use(router);

await connect();
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
