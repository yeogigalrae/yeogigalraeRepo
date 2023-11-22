const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
  putlikebutton(req, res) {
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
          console.log('like1 테이블에서 행 삭제 완료');
          res.status(200).json({ message: 'like1 테이블에서 행 삭제 완료' });
        });
      });
    } else {
      res.status(400).json({ error: '잘못된 요청입니다.' });
    }
  },

  getlikecount(req, res) {
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
  },

  getlikedfestival(req, res) {
    const userid = req.params.user_id;

    connection.query('SELECT * FROM festival_info WHERE festival_id IN (SELECT festival_id FROM like1 WHERE user_id = ?) ORDER BY begin_date', [userid], (error, results, fields) => {
      if (error) {
        console.error('좋아요한 축제 정보 가져오기 실패:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log('좋아요한 축제 정보 가져오기 성공');
      res.status(200).json(results);
    });
  }
};
