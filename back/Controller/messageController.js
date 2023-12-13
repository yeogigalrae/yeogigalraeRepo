const createConnection = require('../database/dbConnection');
const connection = createConnection();
const Message = require('../models/message');

process.env.PYTHONIOENCODING = 'utf-8';

module.exports = {
    getMessage(req, res) {
        const festival_id = req.params.festival_id;
        const pageNum = req.params.pageNum;
        console.log(pageNum);

        const query = `
        SELECT nickname, photo, chat_content, date
        FROM user_info, (
          SELECT *
          FROM live_chat
          WHERE FESTIVAL_ID = ?
          ORDER BY date desc
          limit 10
          offset ?
        ) AS lc
        WHERE user_info.user_id = lc.user_id
        `;
        connection.query(query, [festival_id, Number(pageNum)*10], (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                const messageList = []
                for (let i in results) {
                    let message = new Message(results[i]);
                    messageList.push(message);
                }
                res.status(200).json({ messageList: messageList });
            }
        })
    }
}