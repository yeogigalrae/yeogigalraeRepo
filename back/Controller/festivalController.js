const createConnection = require('../database/dbConnection');
const connection = createConnection();
const Festival = require('../models/festival');
const path = require('path');
const { spawn } = require('child_process');

process.env.PYTHONIOENCODING = 'utf-8';

module.exports = {
  // 좋아요 상위 5개 조회 (메인 페이지)
  getMainFestivals(req, res) {
    const userId = req.params.user_id;
    console.log(userId);
    let getTop5FestivalsQuery = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE 
                                  FROM festival_info LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                                  ON festival_info.festival_id = l.festival_id
                                  WHERE festival_info.end_date > CURDATE()
                                  ORDER BY festival_info.like DESC LIMIT 5`;

    connection.query(getTop5FestivalsQuery, [userId], (error, results, fields) => {
      if (error) {
        console.error('상위 5개 축제 정보 가져오기 실패:', error);
        res.status(500).json({ error: '상위 5개 축제 정보 가져오기 실패' });
        return;
      }
      const festivalList = [];
      for (i in results) {
        const festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      console.log('좋아요 상위 5개 조회');
      res.status(200).json({ festivals: festivalList });

    });
  },
  // 축제 조회 (진행 예정, 진행중)
  getFestivals(req, res) {
    const user_id = req.params.user_id;

    let query = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE
                  FROM festival_info
                  LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                  ON festival_info.festival_id = l.festival_id
                  WHERE festival_info.end_date > CURDATE()
                  ORDER BY festival_info.begin_date`;

    connection.query(query, [user_id], (error, results, fields) => {
      if (error) {
        console.error('축제 정보 가져오기 실패1:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log('축제 정보 가져오기 성공1');
      const festivalList = []
      for (let i in results) {
        let festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      res.status(200).json({ festivals: festivalList });
    });
  },

  // 분류별 축제 검색
  getCategorizeFestival(req, res) {
    const userId = req.params.user_id;
    const category = req.params.category; // 클라이언트에서 보낼때 대소문자 구분
    const date = req.params.date;
    const place = req.params.place.split(','); // 여러 값을 콤마로 구분하여 배열로 변환

    let query = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE
                FROM festival_info LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l ON festival_info.festival_id = l.festival_id
                WHERE 1+1`;

    const params = [userId];

    if (category == 'ALL') {
    } else {
      query += ' AND festival_info.CATEGORY = ?';
      params.push(category);
    }

    if (date == 'ALL') {
      query += ' AND festival_info.end_date > CURDATE()';
    } else {
      query += ' AND (festival_info.end_date > ? AND festival_info.begin_date <= ?)';
      params.push(date, date);
    }

    if (place == 'ALL') {

    } else {
      // 여러 값에 대한 조건을 IN 절로 추가
      query += ' AND festival_info.place IN (?)';
      params.push(place);
    }
    console.log(query);

    connection.query(query + ' ORDER BY festival_info.begin_date ASC', params, (error, results, fields) => {
      if (error) {
        console.error('축제 정보 가져오기 실패2:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log(results);

      console.log('축제 정보 가져오기 성공2');
      const festivalList = []
      for (let i in results) {
        const festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      res.status(200).json({ festivals: festivalList });
    });
  },

  // 축제 검색
  getSearchFestival(req, res) {
    const search = req.params.search;
    const userId = req.params.user_id;

    let query = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE
                  FROM festival_info
                  LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                  ON festival_info.festival_id = l.festival_id
                  WHERE festival_info.end_date > CURDATE()`;

    const params = [userId];

    if (search) {
      query += ' AND (festival_info.name LIKE ? OR festival_info.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    connection.query(query + 'ORDER BY festival_info.begin_date ASC', params, (error, results, fields) => {
      if (error) {
        console.error('축제 정보 가져오기 실패3:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log('축제 정보 가져오기 성공3');
      const festivalList = []
      for (let i in results) {
        const festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      res.status(200).json({ festivals: festivalList });
    });
  },

  //추천 축제 조회
  getRecommendFestivals(req, res) {
    const userId = req.params.user_id;
    try {
      // 파이썬 파일의 디렉토리 경로
      const pythonFilePath = path.join(__dirname, 'recommend', 'recommend.py');

      // 파이썬 프로세스 생성
      const pythonProcess = spawn('python', [pythonFilePath, userId]);

      // 파이썬 스크립트 실행 결과 받기
      let stdout = '';
      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      // 파이썬 스크립트 실행 중 에러 처리
      pythonProcess.on('error', (error) => {
        console.error(`파이썬 실행 중 에러가 발생했습니다: ${error}`);
        res.status(500).json({ error: '파이썬 실행 중 에러가 발생했습니다.' });
      });

      // 파이썬 스크립트 실행 완료 처리
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('파이썬 스크립트 실행이 비정상적으로 종료되었습니다.');
          res.status(500).json({ error: '파이썬 스크립트 실행이 비정상적으로 종료되었습니다.' });
          return;
        }

        // 파이썬 실행 결과 전송
        const recommend_results = stdout.split('\n').filter((result) => result.trim() !== '');
        const params = recommend_results.map((result) => result.trim());

        console.log(params);
        connection.query('SELECT * FROM festival_info WHERE name IN (?, ?, ?, ?, ?)', params, (error, results, fields) => {
          if (error) {
            console.error('추천 축제 정보 가져오기 실패:', error);
            res.status(500).json({ error: '추천 축제 정보 가져오기 실패' });
            return;
          }
          console.log('추천 축제 정보 가져오기 성공');
          const festivalList = results.map((result) => new Festival(result));
          res.status(200).json({ festivals: festivalList });
        });
      });
    } catch (error) {
      console.error(`요청 데이터 파싱 중 에러가 발생했습니다: ${error}`);
      res.status(400).json({ error: '올바른 JSON 형식의 요청 데이터를 전송해야 합니다.' });
    }
  }

  // ,
  // // 축제 상세 정보
  // getFestivalInfo(req, res) {
  //   const festival_id = req.params.festival_id;
  //   const user_id = req.params.user_id

  //   connection.query(
  //     `SELECT *
  //     FROM festival_info leftouterjoin (select user_id
  //                           from like1
  //                           where festival_id = ?) l on (l.user_id = ?)
  //     WHERE festival_id = ?`, [festival_id, user_id, festival_id], (error, results, fields) => {
  //     if (error) {
  //       console.error('축제 상세 조회 실패:', error);
  //       res.status(500).json({ error: '축제 상세 조회 실패' });
  //       return;
  //     }
  //     console.log('축제 상세 조회 성공');
  //     festival = new Festival(results[0]);
  //     res.status(200).json(festival);
  //   });
  // }
};
