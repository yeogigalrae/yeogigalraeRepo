const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require('body-parser');

const app = express();
const createConnection = require('./dbConnection');
const connection = createConnection();
const port = 3000;

app.use(cors());                    //express에서 HTTP 보안을 위해 cors 사용
app.use(express.json());            //express에서 json을 사용하도록 설정
app.use(bodyParser.json()); 


//--------------------------------좋아요 기능----------------------------------------
// festival_info의 like 속성 값 증가 감소, LIKE 테이블의 festival_id,user_id 갑 삽입
app.put('/festivals/:festival_id/like/:user_id', (req, res) => {
  const festival_id = req.params.festival_id;
  const user_id = req.params.user_id;
  const action = req.body.action; // 좋아요 추가인지 취소인지를 나타내는 값

  if (action === 'like') {
    connection.query('UPDATE festival_info SET `like` = `like` + 1 WHERE festival_id = ?', [festival_id], (error, results, fields) => {
      if (error) {
        console.error('카운트 증가 실패:', error);
        res.status(500).json({ error: '카운트 증가 실패' });
        return;
      }
      console.log('카운트 증가 완료');

      connection.query('INSERT INTO `like1` VALUES (?, ?)', [user_id, festival_id], (error, results, fields) => {
        if (error) {
          console.error('LIKE1 테이블에 삽입 실패', error);
          res.status(500).json({ error: 'LIKE1 테이블에 삽입 실패' });
          return;
        }
        console.log('LIKE1 테이블에 삽입 성공');
        res.status(200).json({ message: 'LIKE1 테이블에 삽입 성공' });
      });
    });
  } else if (action === 'unlike') {
    connection.query('UPDATE festival_info SET `like` = `like` - 1 WHERE festival_id = ?', [festival_id], (error, results, fields) => {
      if (error) {
        console.error('카운트 감소 실패:', error);
        res.status(500).json({ error: '카운트 감소 실패' });
        return;
      }
      console.log('카운트 감소 완료');

      connection.query('DELETE FROM `like1` WHERE user_id = ? AND festival_id = ?', [user_id, festival_id], (error, results, fields) => {
        if (error) {
          console.error('like1 테이블에서 행 삭제 실패:', error);
          res.status(500).json({ error: 'like1 테이블에서 행 삭제 실패' });
          return;
        }
        console.log('LIKE1 테이블에서 행 삭제 완료');
        res.status(200).json({ message: 'like1 테이블에서 행 삭제 완료' });
      });
    });
  } else {
    res.status(400).json({ error: '잘못된 요청입니다.' });
  }
});


// 축제 좋아요 갯수 조회
app.get('/festivals/:festival_id/like-count', (req, res) => {   // http://localhost:3000/likeCount/1234 와 같이 GET방식으로 보내야함
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

//-------------------------------내 정보 페이지----------------------------------------
//프로필 사진 조회
app.get('/users/:user_id/image', (req, res) => {
  const userId = req.params.user_id;

  connection.query('SELECT `image` FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
    if (error) {
      console.error('프로필 사진 조회 실패:', error);
      res.status(500).json({ error: '프로필 사진 조회 실패' });
      return;
    }

    if (results.length === 0) {
      console.log('프로필 사진이 없습니다');
      res.status(404).json({ message: '프로필 사진이 없습니다' });
      return;
    }

    const image = results[0].image;
    console.log('프로필 사진 조회 성공');
    res.status(200).json({ image });
  });
});

// 회원 정보 수정 (닉네임 변경)
app.put('/users/:user_id/nickname', (req, res) => {
  const userId = req.params.user_id;
  const newNickname = req.body.nickname;

  connection.query('UPDATE user_info SET nickname = ? WHERE user_id = ?', [newNickname, userId], (error, results, fields) => {
    if (error) {
      console.error('닉네임 변경 실패:', error);
      res.status(500).json({ error: '닉네임 변경 실패' });
      return;
    }
    console.log('닉네임 변경 성공');
    res.status(200).json({ message: '닉네임 변경 성공' });
  });
});

// 회원 정보 수정 (프로필 사진 변경)
app.put('/users/:user_id/image', (req, res) => {
  const userId = req.params.user_id;
  const newImage = req.body.image;

  connection.query('UPDATE user_info SET image = ? WHERE user_id = ?', [newImage, userId], (error, results, fields) => {
    if (error) {
      console.error('프로필 사진 변경 실패:', error);
      res.status(500).json({ error: '프로필 사진 변경 실패' });
      return;
    }
    console.log('프로필 사진 변경 성공');
    res.status(200).json({ message: '프로필 사진 변경 성공' });
  });
});

// 회원 정보 수정(알림 설정)
app.put('/users/:user_id/notice', (req, res) => {
  const user_id = req.params.user_id;
  const notice = req.body.notice;

  connection.query('UPDATE user_info SET notice = ? WHERE user_id = ?', [notice, user_id], (error, results, fields) => {
    if (error) {
      console.error('알림 설정 변경 실패:', error);
      res.status(500).json({ error: '알림 설정 변경 실패' });
      return;
    }
    console.log('알림 설정 변경');
    res.status(200).json({ message: '알림 설정 변경' });
  });
});

// 회원 탈퇴 기능
app.delete('/users/:user_id', (req, res) => {
  const userId = req.params.user_id;

  connection.query('DELETE FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
    if (error) {
      console.error('회원 탈퇴 실패:', error);
      res.status(500).json({ error: '회원 탈퇴 실패' });
      return;
    }
  
    res.status(200).json({ message: '회원 탈퇴가 성공적으로 처리되었습니다.' });
  });
});
//-------------------------------검색 페이지----------------------------------------
// 진행예정 행사 조회
app.get('/festivals/soon-festival', (req, res) => {
  const order_by = req.body.orderby;
  
  let query = 'SELECT * FROM festival_info WHERE begin_date > CURDATE()';

  switch (order_by) {
    case 'like':
      query += ' ORDER BY `like` DESC';
      break;
    case 'distance':
      query += ' ORDER BY distance ASC';
      break;
    default:
      query += ' ORDER BY begin_date ASC'; // 기본 정렬은 date로 설정
  }

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('축제 정보 가져오기 실패:', error);
      res.status(500).json({ error: '축제 정보 가져오기 실패' });
      return;
    }
    console.log('축제 정보 가져오기 성공');
    res.status(200).json(results);
  });
});

// 진행중인 행사 조회
app.get('/festivals/doing-festival', (req, res) => {
  const order_by = req.body.orderby;
 
  let query = 'SELECT * FROM festival_info WHERE begin_date <= CURDATE() AND end_date >= CURDATE()';

  switch (order_by) {
    case 'like':
      query += ' ORDER BY `like` DESC';
      break;
    case 'distance':
      query += ' ORDER BY distance ASC';
      break;
    default:
      query += ' ORDER BY begin_date ASC'; // 기본 정렬은 date로 설정
  }

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('축제 정보 가져오기 실패:', error);
      res.status(500).json({ error: '축제 정보 가져오기 실패' });
      return;
    }
    console.log('축제 정보 가져오기 성공');
    res.status(200).json(results);
  });
});

// 종료된 행사 조회
app.get('/festivals/end-festival', (req, res) => {
  const order_by = req.body.orderby;
  
  let query = 'SELECT * FROM festival_info WHERE end_date < CURDATE()';

  switch (order_by) {
    case 'like':
      query += ' ORDER BY `like` DESC';
      break;
    case 'distance':
      query += ' ORDER BY distance ASC';
      break;
    default:
      query += ' ORDER BY begin_date ASC'; // 기본 정렬은 date로 설정
  }

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('축제 정보 가져오기 실패:', error);
      res.status(500).json({ error: '축제 정보 가져오기 실패' });
      return;
    }
    console.log('축제 정보 가져오기 성공');
    res.status(200).json(results);
  });
});


app.listen(port, () => {
  console.log(`START SERVER : use ${port}`);
});
