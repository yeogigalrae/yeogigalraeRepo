const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const {mainFunction} = require("./database/tourAPI");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

cron.schedule("11 0 * * *", async () => {
  mainFunction();
  console.log("스크립트가 매일 00:00에 실행되었습니다.");
});

module.exports = app;
