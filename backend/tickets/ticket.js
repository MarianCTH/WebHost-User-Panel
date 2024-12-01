const db = require('./../config/database');

function getUserTickets(id, callback) {
  const query = 'SELECT * FROM tickets WHERE user_id = ?';
  db.query(query, [id], callback);
}

function createTicket(user_id, title, status, callback) {
  const query = 'INSERT INTO tickets (user_id, title, status) VALUES (?, ?, ?)';
  db.query(query, [user_id, title, status], callback);
}

function getTicketData(ticket_id, callback) {
  const query = 'SELECT * FROM tickets WHERE id = ?';
  db.query(query, [ticket_id], callback);
}

function getTicketMessages(ticket_id, callback) {
  const query = 'SELECT * FROM ticket_messages WHERE ticket_id = ? ORDER BY created_at ASC';
  db.query(query, [ticket_id], callback);
}


function createTicketMessage(ticket_id, user_id, message, callback) {
  const query = 'INSERT INTO ticket_messages (ticket_id, user_id, message) VALUES (?, ?, ?)';
  db.query(query, [ticket_id, user_id, message], callback);
}

function getAnnouncements(callback) {
  const query = 'SELECT * FROM announcements ORDER BY created_at DESC';
  db.query(query, callback);
}

module.exports = {
    getUserTickets,
    createTicket,
    getTicketData,
    getTicketMessages,
    createTicketMessage,
    getAnnouncements,
};
