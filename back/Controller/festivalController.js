const createConnection = require('../database/dbConnection');
const connection = createConnection();

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
      console.log('축제 정보 가져오기 성공');
      res.status(200).json(results);
    });
  },


  // 분류별 축제 검색
getCategorizeFestival(req, res) {
  const category = req.params.category;
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

  if (place.length > 0) {
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
    console.log('축제 정보 가져오기 성공');
    res.status(200).json(results);
  });
}
,

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
      console.log('축제 정보 가져오기 성공');
      res.status(200).json(results);
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
      res.status(200).json(results);
    });
  }
};
