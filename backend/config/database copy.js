const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'zapptelecom.ro',
  user: 'zapptelecom_myzappaccount',
  password: '~6jVt9k^7cXD',
  database: 'zapptelecom_myzappaccount',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
