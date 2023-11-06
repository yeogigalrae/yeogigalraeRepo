const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());                    //express에서 HTTP 보안을 위해 cors 사용
app.use(express.json());            //express에서 json을 사용하도록 설정

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end("Hello Express");
});

app.listen(port, () => {
  console.log(`START SERVER : use ${port}`);
});
