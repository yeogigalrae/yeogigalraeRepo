const createConnection = require('../database/dbConnection');
const connection = createConnection();
const Festival = require('../models/festival');

module.exports = {
  // 축제 조회 (진행 예정, 진행중)
  getFestivals(req, res) {

    let query = 'SELECT * FROM festival_info WHERE end_date > CURDATE() ORDER BY begin_date';

    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('축제 정보 가져오기 실패:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log('축제 정보 가져오기 성공1');
      const festivalList = []
      for (let i in results ){
        let festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      res.status(200).json(festivalList);
    });
  },

  // 분류별 축제 검색
getCategorizeFestival(req, res) {
  const category = req.params.category; // 클라이언트에서 보낼때 대소문자 구분
  const date = req.params.date;
  const place = req.params.place.split(','); // 여러 값을 콤마로 구분하여 배열로 변환

  let query = 'SELECT * FROM festival_info WHERE 1+1';

  const params = [];

  if (category == 'ALL') {
  } else {
    query += ' AND category = ?';
    params.push(category);
  }

  if (date == 'ALL') {
    query += ' AND end_date > CURDATE()';
  } else {
    query += ' AND (end_date > ? AND begin_date <= ?)';
    params.push(date, date);
  }

  if(place == 'ALL'){

  } else {
    // 여러 값에 대한 조건을 IN 절로 추가
    query += ' AND place IN (?)';
    params.push(place);
  }

  connection.query(query + ' ORDER BY begin_date ASC', params, (error, results, fields) => {
    if (error) {
      console.error('축제 정보 가져오기 실패:', error);
      res.status(500).json({ error: '축제 정보 가져오기 실패' });
      return;
    }
    console.log('축제 정보 가져오기 성공2');
    const festivalList = []
      for (let i in results){
        const festival = new Festival(results[i]);
        festivalList.push(festival);
      }
    res.status(200).json(festivalList);
  });
},

  // 축제 검색
  getSearchFestival(req, res) {
    const search = req.params.search;

    let query = 'SELECT * FROM festival_info WHERE end_date > CURDATE()';

    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    connection.query(query + 'ORDER BY begin_date ASC', params, (error, results, fields) => {
      if (error) {
        console.error('축제 정보 가져오기 실패:', error);
        res.status(500).json({ error: '축제 정보 가져오기 실패' });
        return;
      }
      console.log('축제 정보 가져오기 성공3');
      const festivalList = []
      for (let i in results){
        const festival = new Festival(results[i]);
        festivalList.push(festival);
      }
      res.status(200).json(festivalList);
    });
  },

  // 축제 상세 정보
  getFestivalInfo(req, res) {
    const festival_id = req.params.festival_id;

    connection.query('SELECT * FROM festival_info WHERE festival_id = ?', [festival_id], (error, results, fields) => {
      if (error) {
        console.error('축제 상세 조회 실패:', error);
        res.status(500).json({ error: '축제 상세 조회 실패' });
        return;
      }
      console.log('축제 상세 조회 성공');
      festival = new Festival(results[0]);
      res.status(200).json(festival);
    });
  }
};
