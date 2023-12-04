const createConnection = require('../database/dbConnection');
const connection = createConnection();

const user = {
    id: USER_ID,
    name: NAME,
    email: EMAIL,
    birth: BIRTH,
    gender: GENDER,
    address: ADRESS,
    nickname: NICKNAME,
    photo: PHOTO,
    notice: NOTICE
}    


module.exports = User