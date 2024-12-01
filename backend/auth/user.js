const db = require('./../config/database');

function getUserByEmailAndPassword(email, password, callback) {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], callback);
}

function createUser(email, firstName, lastName, password, callback) {
  const query = 'INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)';
  db.query(query, [email, firstName, lastName, password], callback);
}

function getUserByEmail(email, callback) {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
}

function getUserByID(id, callback) {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], callback);
}

function updateUserProfile(id, first_name, last_name, company_name, phone, picture, country, timezone, website, callback) {
  const query = 'UPDATE users SET first_name = ?, last_name = ?, company_name = ?, phone = ?, picture = ?, country = ?, timezone = ?, website = ? WHERE id = ?';
  db.query(query, [first_name, last_name, company_name, phone, picture, country, timezone, website, id], callback);
}

function updateUserPassword(id, password, callback) {
  const query = 'UPDATE users SET password = ? WHERE id = ?';
  db.query(query, [password, id], callback);
}

function updateUserEmail(id, email, callback) {
  const query = 'UPDATE users SET email = ? WHERE id = ?';
  db.query(query, [email, id], callback);
}

function getUserPassword(id, callback){
  const query = 'SELECT password FROM users WHERE id = ?';
  db.query(query, [id], callback);
}

module.exports = {
  getUserByEmailAndPassword,
  createUser,
  getUserByEmail,
  getUserByID,
  updateUserProfile,
  updateUserPassword,
  updateUserEmail,
  getUserPassword,
};
