const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
  // 진행 예정인 축제
  getsoonfestival(req, res) {
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
  },

   //진행 중인 축제
  getdoingfestival(req, res) {
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
  },

  // 종료된 축제
  getendfestival(req, res) {
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
  },

  // 분류별 축제 검색
  getcategorizefestival(req, res) {
    const category = req.params.category;
    const date = req.params.date;
    const place = req.params.place;
    const search = req.query.search;

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

    if (place == 'ALL') {
    } else {
      query += ' AND place = ?';
      params.push(place);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    connection.query(query, params, (error, results, fields) => {
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
  getfestivalinfo(req, res) {
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
