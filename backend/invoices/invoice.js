const db = require('./../config/database');

function getUserInvoices(user_id, callback) {
  const query = 'SELECT * FROM invoices WHERE user_id = ?';
  db.query(query, [user_id], callback);
}

function creatInvoice(user_id, service_id, due_date, status, callback) {
  const query = 'INSERT INTO invoices (user_id, service_id, due_date, status) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, service_id, due_date, status], callback);
}

function setInvoiceStatus(invoice_id, status, callback) {
  const query = 'UPDATE invoices SET status = ? WHERE id = ?';
  db.query(query, [status, invoice_id], callback);
}

module.exports = {
    getUserInvoices,
    creatInvoice,
    setInvoiceStatus,
};
