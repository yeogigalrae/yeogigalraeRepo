const app = require('./app');
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);
const createConnection = require('./database/dbConnection');
const connection = createConnection();
const Message = require('./models/message')

module.exports = () => {
    io.sockets.on('connection', function (socket) { // connection이라는 이벤트가 발생할 경우 콜백함수가 실행됨
        console.log("유저 접속 됨");

        // 사용자 정의
        socket.on('send', (data) => {
            const user_id = data.user_id;
            const festival_id = data.festival_id;
            const msg = data.msg;

            let query = `
                INSERT INTO LIVE_CHAT(
                    USER_ID, FESTIVAL_ID, CHAT_CONTENT, DATE
                )
                VALUES(?, ?, ?, NOW())`;
            connection.query(query, [user_id, festival_id, msg], (error, results, fields) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = `
                        SELECT *
                        FROM LIVE_CHAT, (
                            SELECT NICKNAME, PHOTO
                            FROM USER_INFO
                            WHERE USER_ID = ?
                        ) AS INFO
                        WHERE CHAT_ID = ?
                            AND USER_ID = ?
                            AND FESTIVAL_ID = ?`;
                    connection.query(
                        query,
                        [user_id, results.insertId, user_id, festival_id],
                        (error, results, fields) => {
                            if(error){
                                console.log(error);
                            } else {
                                console.log("results[0] : ", results[0]);
                                const response = new Message(results[0]);
                                console.log("response : ", response);
                                io.emit('message', response);
                            }
                        }
                    )
                }
            })
        })

        // socekt.io 기본 이벤트
        // 연결되어있던 소켓과 접속이 끊어지면 자동으로 실행
        socket.on('disconnect', function () {
            console.log("접속 종료");
        })

        socket.on('Leave', function(user_id) {
            console.log(user_id+" 연결 종료")
        })
    })

    server.listen(3001, () => {
        console.log("실시간 채팅 서버 연결");
    })
}
