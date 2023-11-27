const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
  // 회원 정보 변경
  updateuserinfo(req,res) {
    const userId = req.params.user_id;
    const newNickname = req.body.nickname;
    const newAddress = req.body.address;
    const newBirth = req.body.birth;
    const newPhoneNumber = req.body.phone_number;
    
    connection.query('UPDATE user_info SET nickname = ?, address = ?, birth = ?, phone_number = ? WHERE user_id = ?', [newNickname, newAddress, newBirth, newPhoneNumber, userId], (error, results, fields) =>{
      if (error) {
        console.error('회원 정보 변경 실패:', error);
        res.status(500).json({ error: '회원 정보 변경 실패' });
        return;
      }
      console.log('회원 정보 변경 성공');
      res.status(200).json({ message: '회원 정보 변경 성공' });
    });
  },

  // 프로필 사진 변경
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
  
  // 알림 설정 변경
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
  
  // 회원 탈퇴
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
