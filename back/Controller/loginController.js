const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
    // 로그인
    userLogin(req, res) {
        const id = req.body.id;
      
        // 첫 번째 쿼리: 사용자 정보 조회
        const getUserInfoQuery = 'SELECT user_id, name, nickname, photo FROM user_info WHERE user_id = ?';
        connection.query(getUserInfoQuery, [id], (error, userResults, fields) => {
          if (error) {
            console.error('로그인 또는 회원 가입 실패:', error);
            res.status(500).json({ error: '로그인 또는 회원 가입 실패' });
            return;
          }
      
          if (userResults.length > 0 && userResults[0].user_id === id) {
            // 두 번째 쿼리: 상위 5개의 좋아요 순으로 정렬된 축제 정보 조회
            const getTop5FestivalsQuery = 'SELECT * FROM festival_info ORDER BY `like` DESC LIMIT 5';
            connection.query(getTop5FestivalsQuery, (error, festivalResults, fields) => {
              if (error) {
                console.error('축제 정보 조회 실패:', error);
                res.status(500).json({ error: '축제 정보 조회 실패' });
                return;
              }
      
              console.log('로그인 및 상위 5개 축제 정보 조회 성공');
              res.status(200).json({ user: userResults[0], top5Festivals: festivalResults });
            });
          } else {
            console.log('회원 가입이 필요합니다');
            res.status(200).json({ message: '회원 가입이 필요합니다.' });
          }
        });
      },
    // 회원 가입
    userSignup(req, res) {
        const id = req.body.id;
        const email = req.body.email;
        const name = req.body.name;
        const photo = req.body.photo;
        const address = req.body.address;
        const sex = req.body.sex;
        const age = req.body.age;
        const nickname = req.body.nickname;

        connection.query('INSERT INTO user_info (user_id, email, name, address, sex, age, nickname, photo) VALUES (?, ?, ?, ?, ?, ?, ? ,?)', [id, email, name, address, sex, age, nickname, photo], (error, results, fields) => {
            if (error) {
                console.error('회원가입 정보 삽입 실패:', error);
                res.status(500).json({ error: '회원가입 정보 삽입 실패' });
                return;
            }
            console.log('회원가입 성공')
            connection.query('SELECT * FROM user_info WHERE user_id = ?', [id], (error, userResults, field) => {
                if (error) {
                    console.error('로그인 실패:', error);
                    res.status(500).json({ error: '로그인 실패' });
                }
                const getTop5FestivalsQuery = 'SELECT * FROM festival_info ORDER BY `like` DESC LIMIT 5';
                connection.query(getTop5FestivalsQuery, (error, festivalResults, fields) => {
                if (error) {
                    console.error('축제 정보 조회 실패:', error);
                    res.status(500).json({ error: '축제 정보 조회 실패' });
                    return;
                }
        
                console.log('로그인 및 상위 5개 축제 정보 조회 성공');
                res.status(200).json({ user: userResults[0], top5Festivals: festivalResults });
                });
            })
        });
    }
}