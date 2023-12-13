const createConnection = require("../database/dbConnection");
const connection = createConnection();
const Festival = require("../models/festival");

module.exports = {
  // 좋아요 버튼 (23.12.05 수정할거임)
  putLikeButton(req, res) {
    const festival_id = req.params.festival_id;
    const user_id = req.params.user_id;

    let query = `SELECT * FROM like1 WHERE user_id = ? and festival_id = ?`;
    connection.query(query, [user_id, festival_id], (error, results, field) => {
      if (error) {
        console.error("실패:", error);
        res.status(500).json({error: "실패"});
        return;
      }

      if (results != "") {
        connection.query("UPDATE festival_info SET `like` = `like` - 1 WHERE festival_id = ?", [festival_id], (error, results, fields) => {
          if (error) {
            console.error("카운트 감소 실패:", error);
            res.status(500).json({error: "카운트 감소 실패"});
            return;
          }
          console.log("카운트 감소 완료");

          connection.query("DELETE FROM `like1` WHERE user_id = ? AND festival_id = ?", [user_id, festival_id], (error, results, fields) => {
            if (error) {
              console.error("like1 테이블에서 행 삭제 실패:", error);
              res.status(500).json({error: "like1 테이블에서 행 삭제 실패"});
              return;
            }
            let query = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE, COALESCE(subquery.state, 'neutral') AS SENTIMENT
                            FROM festival_info
                            LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                                ON festival_info.festival_id = l.festival_id
                            LEFT OUTER JOIN (
                              SELECT festival_id, state
                              FROM (
                                  SELECT festival_id, state, COUNT(*) as count, RANK() OVER (PARTITION BY festival_id ORDER BY COUNT(*) DESC) as rank
                                  FROM live_chat
                                  GROUP BY festival_id, state
                              ) as subquery
                              WHERE rank = 1
                          ) as subquery
                                ON festival_info.festival_id = subquery.festival_id
                            WHERE festival_info.end_date > CURDATE() AND festival_info.festival_id = ?
                            ORDER BY festival_info.begin_date`;

            connection.query(query, [user_id, festival_id], (error, results, fields) => {
              if (error) {
                console.error("축제 좋아요 갯수 조회 실패:", error);
                res.status(500).json({error: "축제 좋아요 갯수 조회 실패"});
                return;
              }
              console.log("축제 정보 조회 성공");
              const festival = new Festival(results[0]);
              res.status(200).json({festival: festival});
            });
          });
        });
      } else {
        connection.query("UPDATE festival_info SET `like` = `like` + 1 WHERE festival_id = ?", [festival_id], (error, results, fields) => {
          if (error) {
            console.error("카운트 증가 실패:", error);
            res.status(500).json({error: "카운트 증가 실패"});
            return;
          }
          console.log("카운트 증가 완료");

          connection.query("INSERT INTO `like1` VALUES (?, ?)", [user_id, festival_id], (error, results, fields) => {
            if (error) {
              console.error("LIKE1 테이블에 삽입 실패", error);
              res.status(500).json({error: "LIKE1 테이블에 삽입 실패"});
              return;
            }
            let query = `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE, COALESCE(subquery.STATE, 'neutral') AS SENTIMENT
              FROM festival_info
              LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                  ON festival_info.festival_id = l.festival_id
              LEFT OUTER JOIN (
                SELECT festival_id, state
                FROM (
                    SELECT festival_id, state, COUNT(*) as count, RANK() OVER (PARTITION BY festival_id ORDER BY COUNT(*) DESC) as rank
                    FROM live_chat
                    GROUP BY festival_id, state
                ) as subquery
                WHERE rank = 1
            ) as subquery
                  ON festival_info.festival_id = subquery.festival_id
              
              WHERE festival_info.end_date > CURDATE() AND festival_info.festival_id = ?
              ORDER BY festival_info.begin_date`;

            connection.query(query, [user_id, festival_id], (error, results, fields) => {
              if (error) {
                console.error("축제 좋아요 갯수 조회 실패:", error);
                res.status(500).json({error: "축제 좋아요 갯수 조회 실패"});
                return;
              }
              console.log("축제 정보 조회 성공");
              const festival = new Festival(results[0]);
              res.status(200).json({festival: festival});
            });
          });
        });
      }
    });
  },

  // 좋아요한 축제
  getLikedFestival(req, res) {
    const userId = req.params.user_id;

    connection.query(
      `SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE, COALESCE(subquery.STATE, 'neutral') AS SENTIMENT 
                      FROM festival_info 
                      LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
                          ON festival_info.festival_id = l.festival_id
                      LEFT OUTER JOIN (
                        SELECT festival_id, state
                        FROM (
                            SELECT festival_id, state, COUNT(*) as count, RANK() OVER (PARTITION BY festival_id ORDER BY COUNT(*) DESC) as rank
                            FROM live_chat
                            GROUP BY festival_id, state
                        ) as subquery
                        WHERE rank = 1
                    ) as subquery
                          ON festival_info.festival_id = subquery.festival_id
                      WHERE festival_info.festival_id IN (SELECT festival_info.festival_id FROM like1 WHERE user_id = ?) 
                      AND festival_info.end_date > CURDATE()
                      AND IF(l.festival_id IS NOT NULL, 1, NULL) = 1
                      ORDER BY begin_date`,
      [userId, userId],
      (error, results, fields) => {
        if (error) {
          console.error("좋아요한 축제 정보 가져오기 실패:", error);
          res.status(500).json({error: "축제 정보 가져오기 실패"});
          return;
        }
        console.log("좋아요한 축제 정보 가져오기 성공");
        const festivalList = [];
        for (let i in results) {
          const festival = new Festival(results[i]);
          festivalList.push(festival);
        }
        res.status(200).json({festivals: festivalList});
      }
    );
  },
};
