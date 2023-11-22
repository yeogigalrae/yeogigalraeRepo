const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
  updateUserNickname(req, res) {
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
  },
  
  updateUserImage(req, res) {
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
  },
  
  getUserImage(req, res) {
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
  },
  
  updateNoticeSettings(req, res) {
    const userId = req.params.user_id;
    const notice = req.body.notice;
  
    connection.query('UPDATE user_info SET `notice` = ? WHERE user_id = ?', [notice, userId], (error, results, fields) => {
      if (error) {
        console.error('알림 설정 변경 실패:', error);
        res.status(500).json({ error: '알림 설정 변경 실패' });
        return;
      }
      console.log('알림 설정 변경');
      res.status(200).json({ message: '알림 설정 변경' });
    });
  },
  
  deleteUser(req, res) {
    const userId = req.params.user_id;
  
    connection.query('DELETE FROM user_info WHERE user_id = ?', [userId], (error, results, fields) => {
      if (error) {
        console.error('회원 탈퇴 실패:', error);
        res.status(500).json({ error: '회원 탈퇴 실패' });
        return;
      }
    
      res.status(200).json({ message: '회원 탈퇴가 성공적으로 처리되었습니다.' });
    });
  }
};
