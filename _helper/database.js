// mySQL server
const mysql = require("mysql");
// Promise for result from callback functions
const q = require("q");

// config sever
var _HOST = "127.0.0.1",
  _USER = "root",
  _PWD = "1412468",
  _DB = "userinfo";

// load data (exports for using in another file)
exports.load = function(queryString) {
  // create connection with server
  const connection = mysql.createConnection({
    host: _HOST,
    user: _USER,
    password: _PWD,
    database: _DB
  });
  // "promise" variable
  var defer = q.defer();
  // connect with server
  connection.connect();
  // start querying, pass result in callback functions
  connection.query(queryString, function(error, results) {
    // create "promise"
    if (error) throw error;
    defer.resolve(results);
  });
  // close a connection
  connection.end();
  // return "promise"
  return defer.promise;
};

exports.insert = function(sql) {
  var defer = q.defer();
  const connection = mysql.createConnection({
    host: _HOST,
    user: _USER,
    password: _PWD,
    database: _DB
  });

  connection.connect();

  connection.query(sql, function(error, result) {
    if (error) throw error;
    defer.resolve(result.insertId);
  });

  connection.end();
  return defer.promise;
};

exports.update = function(sql) {
  var defer = q.defer();

  var connection = mysql.createConnection({
    host: _HOST,
    user: _USER,
    password: _PWD,
    database: _DB
  });

  connection.connect();

  connection.query(sql, function(error, value) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(value.changedRows);
    }
  });

  connection.end();

  return defer.promise;
};

exports.delete = function(sql) {
  var defer = q.defer();

  var connection = mysql.createConnection({
    host: _HOST,
    user: _USER,
    password: _PWD,
    database: _DB
  });

  connection.connect();

  connection.query(sql, function(error, value) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(value.affectedRows);
    }
  });

  connection.end();

  return defer.promise;
};
