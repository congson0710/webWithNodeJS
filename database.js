const mysql = require("mysql");

var _HOST = '127.0.0.1',
    _USER = 'root',
    _PWD = '1412468',
    _DB = 'userinfo';

exports.load = function (queryString) {
    const connection = mysql.createConnection({
        host: _HOST,
        user: _USER,
        password: _PWD,
        database: _DB
    })

    connection.connect();

    connection.query(queryString, function (error, results) {
        console.log("Data from DB", results);
        console.log("error", error);
    })
}
