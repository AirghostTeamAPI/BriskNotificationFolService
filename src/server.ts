import bodyParser from "body-parser";
import express from "express";
import connectDB from "../config/database";
import { importCsvFile } from './scripts/FOL';
import cors from 'cors';
require('dotenv').config();

const app = express();
connectDB();

app.set("port", process.env.PORT || 5000);
app.set("jwt", process.env.jwtSecret || 5000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

import FOL from './routes/api/FOL';
app.use("/api", FOL);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

importCsvFile()
setInterval(function () {
  console.log('Syncing Spreadsheets...');
  importCsvFile()
}, 60 * 1000); // 60 * 1000 milsec

export default server;
