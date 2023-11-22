const mysql = require("mysql2");

module.exports = function createConnection() {
    
    const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'TESTDB'
    });
    
    connection.connect((error) => {
    if (error) {
    console.error('연결 실패:', error);
    return;
    }
    console.log('연결 성공!');
    });
    
    return connection;
};