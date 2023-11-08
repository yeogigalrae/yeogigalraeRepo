const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;

const createConnection = require('./dbConnection');
const connection = createConnection();

app.use(cors());                    //express에서 HTTP 보안을 위해 cors 사용
app.use(express.json());            //express에서 json을 사용하도록 설정



// 해당 축제에 좋아요를 누르면 좋아요 값이 1씩 증가
app.post('/like/:festival_id', (req, res) => {
  const { festival_id } = req.body;  

  connection.query('UPDATE festival_info SET `like` = `like` + 1', (error, results, fields) => {
    if (error) {
      console.error('카운트 증가 실패:', error);
      res.status(500).json({ error: '카운트 증가 실패' });
      return;
    }
    console.log('카운트 증가 완료');
    res.status(200).json({ message: '카운트 증가 완료' });
  });
});

// 해당 축제에 좋아요를 취소하면 좋아요 값이 1씩 감소
app.post('/unlike/:festival_id', (req, res) => {   
  const { festival_id } = req.body;  

  connection.query('UPDATE festival_info SET `like` = `like` - 1', (error, results, fields) => {
    if (error) {
      console.error('카운트 감소 실패:', error);
      res.status(500).json({ error: '카운트 감소 실패' });
      return;
    }
    console.log('카운트 감소 완료');
    res.status(200).json({ message: '카운트 감소 완료' });
  });
});

// 축제 좋아요 조회
app.get('/likeCount/:festival_id', (req, res) => {   // http://localhost:3000/likeCount/1234 와 같이 GET방식으로 보내야함
  const festivalId = req.params.festival_id; // 클라이언트에서 festiverId 값을 URL 경로로 전달받음

  connection.query('SELECT `LIKE` FROM festival_info WHERE FESTIVAL_ID = ?', [festivalId], (error, results, fields) => {
    if (error) {
      console.error('속성값 조회 실패:', error);
      res.status(500).json({ error: '속성값 조회 실패', message: error.message });
      return;
    }
    const likeCount = results[0]['LIKE']; // 'like' 속성값을 가져옴
    res.status(200).json({ likeCount });
  });
});





app.listen(port, () => {
  console.log(`START SERVER : use ${port}`);
});
