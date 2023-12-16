const createConnection = require('../database/dbConnection');
const connection = createConnection();
const Festival = require('../models/festival');

process.env.PYTHONIOENCODING = 'utf-8';

function searchCoordinates(latitude, longitude, latitude_delta, longitude_delta, user_id) {
    const latitudeMin = latitude - latitude_delta;
    const latitudeMax = latitude + latitude_delta;
    const longitudeMin = longitude - longitude_delta;
    const longitudeMax = longitude + longitude_delta;

    // 검색 쿼리를 작성합니다.
    const query = `
        SELECT festival_info.*, IF(l.festival_id IS NOT NULL, 1, NULL) AS LIKESTATE
        FROM festival_info
        LEFT OUTER JOIN (SELECT festival_id FROM like1 WHERE user_id = ?) l
        ON festival_info.festival_id = l.festival_id
        WHERE festival_info.end_date > CURDATE()
        AND latitude BETWEEN ${latitudeMin} AND ${latitudeMax}
        AND longitude BETWEEN ${longitudeMin} AND ${longitudeMax}
        ORDER BY festival_info.begin_date
    `;

    // 데이터베이스에서 검색합니다.
    return new Promise((resolve, reject) => {
        connection.query(query, [user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    getFestivals(req, res) {
        const { latitude, longitude, latitude_delta, longitude_delta, user_id } = req.params;

        searchCoordinates(parseFloat(latitude), parseFloat(longitude), parseFloat(latitude_delta), parseFloat(longitude_delta), user_id)
            .then((results) => {
                let festivalList = [];
                for(let i in results){
                    let festival = new Festival(results[i]);
                    festivalList.push(festival);
                }
                // 검색 결과를 프론트엔드로 전송합니다.
                res.json({festivals : festivalList});
            })
            .catch((error) => {
                console.error('검색 중 오류가 발생했습니다:', error);
                res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
            });
    }
}