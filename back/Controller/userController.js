const createConnection = require('../database/dbConnection');
const connection = createConnection();
const User = require('../models/user');

module.exports = {
  // 회원 정보 변경
  updateUserInfo(req, res) {
    const userId = req.params.user_id;
    const newNickname = req.body.user.nickname;
    const newAddress = req.body.user.address;
    const newBirth = req.body.user.birth;
    const newPhoto = req.body.user.photo;
    const newGender = req.body.user.gender;

    console.log(newPhoto);
    let query = 'UPDATE user_info SET';

    const params = [];

    if (newNickname) {
      query += ' nickname = ?,';
      params.push(newNickname);
    }
    if (newAddress) {
      query += ' address = ?,';
      params.push(newAddress);
    }
    if (newBirth) {
      query += ' birth = ?,';
      params.push(newBirth);
    }
    if (newPhoto) {
      query += ' photo = ?,';
      params.push(newPhoto);
    }
    if (newGender) {
      query += ' gender = ?,';
      params.push(newGender);
    }

    // 만약에 모든 업데이트 조건이 없을 경우
    if (params.length === 0) {
      res.status(400).json({ error: '업데이트할 정보가 없습니다.' });
      return;
    }

    // 마지막 쉼표 제거
    query = query.slice(0, -1);

    query += ' WHERE user_id = ?';
    params.push(userId);

    connection.query(query, params, (error, results, fields) => {
      if (error) {
        console.error('회원 정보 변경 실패:', error);
        res.status(500).json({ error: '회원 정보 변경 실패' });
        return;
      }
      connection.query('SELECT * FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
          console.error('회원 정보 조회 실패:', error);
          res.status(500).json({ error: '회원 정보 조회 실패' });
          return;
        }
        console.log('회원 정보 조회 성공');
        const user = new User(results[0]);
        console.log(user.photo);
        // const decodedString = user.photo.toString('utf8');
        // console.log(decodedString);

        res.status(200).json({ user: user });
      });
    });
  },

  // 알림 설정 변경
  updateNoticeSettings(req, res) {
    const userId = req.params.user_id;
    const notice = req.body.user.notice;

    connection.query('UPDATE user_info SET `notice` = ? WHERE user_id = ?', [notice, userId], (error, results, fields) => {
      if (error) {
        console.error('알림 설정 변경 실패:', error);
        res.status(500).json({ error: '알림 설정 변경 실패' });
        return;
      }
      connection.query('SELECT * FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
          console.error('알림 설정 조회 실패:', error);
          res.status(500).json({ error: '알림 설정 조회 실패' });
          return;
        }
        console.log('알림 설정 변경');
        const user = new User(results[0]);
        res.status(200).json({ user: user });
      });
    });
  },

  // 회원 탈퇴
  deleteUser(req, res) {
    const userId = req.params.user_id;

    connection.query('DELETE FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
      if (error) {
        console.error('회원 탈퇴 실패:', error);
        res.status(500).json({ error: '회원 탈퇴 실패' });
        return;
      }
      console.log('회원 탈퇴가 성공적으로 처리되었습니다.');
      res.status(200).json({ message: '회원 탈퇴가 성공적으로 처리되었습니다.' });
    });
  }
};
