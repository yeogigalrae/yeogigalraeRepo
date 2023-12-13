const createConnection = require('../database/dbConnection');
const connection = createConnection();
const Message = require('../models/message');

process.env.PYTHONIOENCODING = 'utf-8';

module.exports = {
    getMessage(req, res) {
        const festival_id = req.params.festival_id;
        const pageNum = req.params.pageNum;

        const query = `
            SELECT NICKNAME, PHOTO, CHAT_CONTENT, DATE
            FROM USER_INFO, (
                SELECT *
                FROM LIVE_CHAT
                WHERE FESTIVAL_ID = ?
                ORDER BY DATE DESC
                LIMIT 20
                OFFSET ?
            ) AS LC
            WHERE USER_INFO.USER_ID = LC.USER_ID
            ORDER BY DATE ASC
        `;
        connection.query(query, [festival_id, Number(pageNum)*20], (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                const messageList = []
                for (let i in results) {
                    let message = new Message(results[i]);
                    console.log(message);
                    messageList.push(message);
                }
                res.status(200).json({ messageList: messageList });
            }
        })
    }
}