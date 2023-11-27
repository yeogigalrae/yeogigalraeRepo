const createConnection = require('../database/dbConnection');
const connection = createConnection();

module.exports = {
    // 로그인
    userlogin(req, res) {
        const id = req.body.id;
    
        connection.query('SELECT user_id, name, nickname, photo FROM user_info WHERE user_id = ?', [id], (error, results, fields) => {
            if (error) {
                console.error('로그인 또는 회원 가입 실패:', error);
                res.status(500).json({ error: '로그인 또는 회원 가입 실패' });
                return;
            }
    
            if (results.length > 0 && results[0].user_id === id) {
                console.log('회원 로그인 성공');
                res.status(200).json(results);

            } else {
                console.log('회원 가입이 필요합니다');
                res.status(200).json({ message : '회원 가입이 필요합니다.' });                
            }
        });
    },
    // 회원 가입
    usersignup(req, res) {
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
            connection.query('SELECT user_id, name, nickname, photo FROM user_info WHERE user_id = ?', [id], (error, results, field) => {
                if (error) {
                    console.error('로그인 실패:', error);
                    res.status(500).json({ error: '로그인 실패' });
                }
                console.log('로그인 성공');
                res.status(200).json(results);
            })
        });
    }
}