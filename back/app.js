const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'TESTDB'
});

connection.connect((error) => {
  if (error) {
   console.error('연결 실패:', error);
   return;
   }
   console.log('연결 성공!')
});

app.use(cors());                    //express에서 HTTP 보안을 위해 cors 사용
app.use(express.json());            //express에서 json을 사용하도록 설정

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end("Hello Express");
});

app.listen(port, () => {
  console.log(`START SERVER : use ${port}`);
});
