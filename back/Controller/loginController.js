const createConnection = require("../database/dbConnection");
const connection = createConnection();
const User = require("../models/user");

module.exports = {
  // 로그인
  userLogin(req, res) {
    const id = req.params.id;
    const password = req.params.password;
    console.log(id);

    // 첫 번째 쿼리: 사용자 정보 조회
    const getUserInfoQuery = "SELECT * FROM user_info WHERE id = ? AND password = ?";
    connection.query(getUserInfoQuery, [id, password], (error, userResults, fields) => {
      if (error) {
        console.error("로그인 또는 회원 가입 실패1:", error);
        res.status(500).json({error: "로그인 또는 회원 가입 실패"});
        return;
      }

      if (userResults.length > 0) {
        const user = new User(userResults[0]);
        res.status(200).json({user: user});
      } else {
        console.log("로그인 또는 회원 가입 실패:");
        res.status(200).json(false);
      }
    });
  },

  userSignup(req, res) {
    const id = req.body.user.id;
    const password = req.body.user.password;
    const name = req.body.user.name;
    const email = req.body.user.email;

    connection.query(
      `INSERT INTO user_info (user_id, id, password, name, email) VALUES (REPLACE(UUID(),'-',' '), ?, ?, ?, ?)`,
      [id, password, name, email],
      (error, results, field) => {
        if (error) {
          console.log("회원 가입 실패");
          res.status(500).json({error: "회원 가입 실패"});
        }
        console.log("회원 가입 성공");
        res.status(200).json(true);
      }
    );
  },

  userSignupIdCheck(req, res) {
    const id = req.params.id;

    connection.query("SELECT * FROM user_info WHERE id= ?", [id], (error, results, field) => {
      if (error) {
        console.log("중복 확인 실패");
        res.status(500).json({error: "중복 확인 실패"});
      }

      if (results.length == 1) {
        console.log("중복 되었습니다.");
        res.status(200).json(false);
      } else if (results.length == 0) {
        console.log("중복 되지 않았습니다.");
        res.status(200).json(true);
      } else {
        console.log("데이터가 이상합니다.");
        res.status(200).json({message: "데이터가 이상합니다."});
      }
    });
  },
};
