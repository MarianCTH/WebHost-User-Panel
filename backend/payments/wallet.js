const db = require('./../config/database');

function getWallet(user_id, callback) {
    const query = 'SELECT * FROM wallet WHERE user_id = ?';
    db.query(query, [user_id], callback);
}

function addMoney(user_id, amount, callback) {
    const query = 'UPDATE wallet SET balance = balance + ? WHERE user_id = ?';
    db.query(query, [amount, user_id], callback);
}

function withdrawMoney(user_id, amount, callback) {
    const query = 'UPDATE wallet SET balance = balance - ? WHERE user_id = ?';
    db.query(query, [amount, user_id], callback);
}

function getWalletHistory(user_id, callback) {
    const query = 'SELECT * FROM wallet_history WHERE user_id = ?';
    db.query(query, [user_id], callback);
}

function createWallet(user_id, callback) {
    const query = 'INSERT INTO wallet (user_id, balance) VALUES (?, 0)';
    db.query(query, [user_id], callback);
}

module.exports = {
    getWallet,
    addMoney,
    withdrawMoney,
    getWalletHistory,
    createWallet,
};