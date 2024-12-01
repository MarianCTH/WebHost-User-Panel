const db = require('./../config/database');

function createService(name, username, status, type, user_id, pack_id, end_date, used_promocode, callback) {
  const query = 'INSERT INTO services (name, username, status, type, user_id, pack_id, end_date, used_promocode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, username, status, type, user_id, pack_id, end_date, used_promocode], callback);
}

function createServiceBillingAddress(service_id, street, city, postal_code, callback) {
  const query = 'INSERT INTO billing_address (service_id, street, city, postal_code) VALUES (?, ?, ?, ?)';
  db.query(query, [service_id, street, city, postal_code], callback);
}

function getUserServices(id, callback) {
  const query = 'SELECT * FROM services WHERE user_id = ?';
  db.query(query, [id], callback);
}

function getOneService(service_id, callback){
  const query = 'SELECT * FROM services WHERE service_id = ?';
  db.query(query, [service_id], callback);
}

function getServicePack(pack_id, callback) {
  const query = 'SELECT * FROM packs WHERE pack_id = ? LIMIT 1';
  db.query(query, [pack_id], callback);
}

function getAllPacks(callback) {
  const query = 'SELECT * FROM packs';
  db.query(query, [], callback);
}

module.exports = {
    getUserServices,
    getServicePack,
    getOneService,
    getAllPacks,
    createService,
    createServiceBillingAddress,
};
