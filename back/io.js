const app = require("./app");
const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server);
const createConnection = require("./database/dbConnection");
const connection = createConnection();
const Message = require("./models/message");
const analyzeSentiment = require("./moduels/sentimentmodule");

module.exports = () => {
  io.sockets.on("connection", function (socket) {
    // connection이라는 이벤트가 발생할 경우 콜백함수가 실행됨
    console.log("유저 접속 됨");

    // 사용자 정의
    socket.on("send", (data) => {
      const user_id = data.user_id;
      const festival_id = data.festival_id;
      const msg = data.msg;

      async function insertmessagedata(text) {
        try {
          // 메시지 분석
          const sentimentResult = await analyzeSentiment(text);

          let query = `
                INSERT INTO live_chat(
                    USER_ID, FESTIVAL_ID, CHAT_CONTENT, DATE, STATE
                )
                VALUES(?, ?, ?, now(), ?)`;

          // 여기에서 sentimentResult를 가지고 처리 로직을 추가할 수 있습니다.
          connection.query(query, [user_id, festival_id, text, sentimentResult], (error, results, fields) => {
            if (error) {
              console.error(error);
            } else {
              let query = `
                            SELECT *
                            FROM live_chat, (
                                select NICKNAME, PHOTO
                                from user_info
                                where USER_ID = ?
                            ) as info
                            where CHAT_ID = ?
                                and USER_ID = ?
                                and FESTIVAL_ID = ?`;
              connection.query(query, [user_id, results.insertId, user_id, festival_id], (error, results, fields) => {
                if (error) {
                  console.log(error);
                } else {
                  const response = new Message(results[0]);
                  io.emit("message", response);
                }
              });
            }
          });

          // return processedMessage;
        } catch (error) {
          console.error(error);
          //   throw error;
        }
      }

      insertmessagedata(msg);
      //   connection.query(query, [user_id, festival_id, msg], (error, results, fields) => {
      //     if (error) {
      //       console.error(error);
      //     } else {
      //       let query = `
      //                     select *
      //                     from live_chat, (
      //                         select nickname, photo
      //                         from user_info
      //                         where user_id = ?
      //                     ) as info
      //                     where chat_id = ?
      //                         and user_id = ?
      //                         and festival_id = ?`;
      //       connection.query(query, [user_id, results.insertId, user_id, festival_id], (error, results, fields) => {
      //         if (error) {
      //           console.log(error);
      //         } else {
      //           const response = new Message(results[0]);
      //           io.emit("message", response);
      //         }
      //       });
      //     }
      //   });
    });

    // socekt.io 기본 이벤트
    // 연결되어있던 소켓과 접속이 끊어지면 자동으로 실행
    socket.on("disconnect", function () {
      console.log("접속 종료");
    });
  });

  server.listen(3001, () => {
    console.log("실시간 채팅 서버 연결");
  });
  // 메시지를 처리하는 함수
  function processChatMessage(user_id, festival_id, msg) {
    // 이 부분에서 메시지 처리 로직을 구현하고, 처리된 결과를 반환
    const processedMessage = {
      state: "processed", // 이것은 예시이므로 실제 처리된 결과에 맞게 수정
    };
    return processedMessage;
  }
};
