const express = require('express');
const cors = require('cors');
const user = require('./auth/user');
const serv = require('./services/service');
const invoice = require('./invoices/invoice');
const ticket = require('./tickets/ticket');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SVPU|57GO2nn<e<)%Zc+HB8l_m2H/y*Tewjm+Yc7d"aZ)-EcZDS)f[U@$IhVjQ';
const app = express();
const axios = require('axios');
const paypal = require('./payments/paypal-config');
var cpanel = require('cpanel-lib');
var wallet = require('./payments/wallet');

var options = {
  host: 'serverweb.zappnet.ro',
  port: 2087,
  secure: true,
  username: 'root',
  accessKey: 'PBI2DNDI320TI3JFIC8U68LD7GW6B33W',
  ignoreCertError: true
};
const allowedOrigins = [
  'https://test.zapptelecom.ro',
  'http://localhost:5173',
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());
app.use('/login', (req, res) => {
    const { email, password } = req.body;
    user.getUserByEmailAndPassword(email, password, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).json({ error: 'Server error' });
        return;
      }
      if (results.length > 0) {
        const userId = results[0].id;
        const userData = { userId, email: results[0].email, first_name: results[0].first_name, last_name: results[0].last_name,
          companyName: results[0].company_name, phone: results[0].phone, pic: results[0].picture, role: results[0].role, language: results[0].language,
          timeZone: results[0].timezone, website: results[0].website, created_at: results[0].created_at, country: results[0].country};
        const api_token = jwt.sign(userData, jwtSecret, { expiresIn: '2h' });
        res.json({ message: 'Login successful', api_token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
});

app.use('/verify_token', (req, res) => {
    const token = req.body.api_token;
  
    if (!token) {
      return res.status(403).json({ error: 'Token not provided' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
      }
  
      // If verification is successful, return decoded user information
      res.json(decoded);
    });
});

app.use('/register', (req, res) => {
    const { email, first_name, last_name, password } = req.body;
  
    user.getUserByEmail(email, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query: ', error);
        res.status(500).json({ error: 'Server error' });
        return;
      }
  
      if (results.length > 0) {
        res.status(409).json({ error: 'User already exists' });
      } else {
        user.createUser(email, first_name, last_name, password, (error, results) => {
          if (error) {
            console.error('Error executing MySQL query: ', error);
            res.status(500).json({ error: 'Server error' });
            return;
          }
  
          user.getUserByEmailAndPassword(email, password, (error, results) => {
            if (error) {
              console.error('Error executing MySQL query: ', error);
              res.status(500).json({ error: 'Server error' });
              return;
            }
            if (results.length > 0) {
              wallet.createWallet(results[0].id, (error, walletResults) => {
                if (error) {
                  console.error('Error executing MySQL query: ', error);
                  res.status(500).json({ error: 'Server error' });
                  return;
                }
                if(walletResults.affectedRows > 0){
                  const userId = results[0].id;
                  const userData = { userId, email: results[0].email, first_name: results[0].first_name, last_name: results[0].last_name,
                    company_name: results[0].company_name, phone: results[0].phone, pic: results[0].picture, language: results[0].language,
                    timezone: results[0].timezone, website: results[0].website, created_at: results[0].created_at, country: results[0].country};
                  const api_token = jwt.sign(userData, jwtSecret, { expiresIn: '2h' });
                  res.json({ message: 'Registration successful', api_token });
                }
              });
            } else {
              res.status(401).json({ error: 'Invalid credentials' });
            }
          });
        });
      }
    });
 });

app.use('/update_user_profile', (req, res) => {
  const data = req.body;
  user.updateUserProfile(data.id, data.first_name, data.last_name, data.company_name, data.phone, data.picture, data.country, data.timezone, data.website, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      res.json("User data updated successfully");
    }
  });

});

app.use('/update_user_password', (req, res) => {
  const data = req.body;
  user.updateUserPassword(data.id, data.password, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      res.json("User password updated successfully");
    }
  });

});

app.use('/update_user_email', (req, res) => {
  const data = req.body;
  user.updateUserEmail(data.id, data.email, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      res.json("User email updated successfully");
    }
  });

});

app.use('/check_user_password', (req, res) => {
  const data = req.body;
  user.getUserPassword(data.id, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.length > 0){
      if(results[0].password === data.password){
        res.json("1");
      }
      else{
        res.json("0");
      }
    }
    else{
      res.json(0);
    }
  });
});

app.use('/get_services', (req, res) => {
  const { id } = req.body;
  serv.getUserServices(id, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      Promise.all(results.map(service => {
        return new Promise((resolve, reject) => {
          serv.getServicePack(service.pack_id, (error, packResults) => {
            if (error) {
              console.error('Error executing MySQL query: ', error);
              reject('Server error');
              return;
            }
            if (packResults.length > 0) {
              resolve({
                service_id: service.service_id,
                name: service.name,
                username: service.username,
                status: service.status,
                created_date: service.created_date,
                end_date: service.end_date,
                pack: {
                  pack_id: packResults[0].pack_id,
                  name: packResults[0].name,
                  description: packResults[0].description,
                  price: packResults[0].price
                }
              });
            } else {
              resolve([]);
            }
          });
        });
      })).then((data) => {
        res.json(data);
      }).catch((err) => {
        console.error('Error fetching pack data: ', err);
        res.status(500).json({ error: 'Server error' });
      });
    } else {
      res.json([]);
    }
  });
});

app.use('/get_one_service', (req, res) => {
  const { service_id } = req.body;
  serv.getOneService(service_id, (error, service) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (service.length > 0) {
      serv.getServicePack(service[0].pack_id, (error, packResults) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).json({ error: 'Server error' });
          return;
        }
        if (packResults.length > 0) {
            const data = {
              service_id: service[0].service_id,
              name: service[0].name,
              username: service[0].username,
              status: service[0].status,
              created_date: service[0].created_date,
              end_date: service[0].end_date,
              pack: {
                pack_id: packResults[0].pack_id,
                name: packResults[0].name,
                description: packResults[0].description,
                price: packResults[0].price
              }
            }
            res.json(data);
        }
      });
    } else {
      res.json([]);
    }
  });
});

app.use('/get_packs', (req, res) => {
  serv.getAllPacks((error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
        res.json(results);
    } else {
      res.json([]);
    }
  });
});

function formatDateToSQL(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

app.use('/create_service', (req, res) => {
  const { name, username, status, type, user_id, pack_id, end_date, used_promocode, billing_address, billing_city, billing_postal_code} = req.body;
  const formatedEndDate = formatDateToSQL(new Date(end_date));
  serv.createService(name, username, status, type, user_id, pack_id, end_date, used_promocode, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      const today = new Date();
      const dateAfter30Days = new Date(today);
      dateAfter30Days.setDate(today.getDate() + 30);
      const todaySQL = formatDateToSQL(today);
      const dateAfter30DaysSQL = formatDateToSQL(dateAfter30Days);

      invoice.creatInvoice(user_id, results.insertId, dateAfter30DaysSQL, 'paid', (error, invoiceResults) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).json({ error: 'Server error' });
          return;
        }
        if(invoiceResults.affectedRows > 0){
          serv.createServiceBillingAddress(results.insertId, billing_address, billing_city, billing_postal_code, (error, billingResults) => {
            if (error) {
              console.error('Error executing MySQL query: ', error);
              res.status(500).json({ error: 'Server error' });
              return;
            }
            if(billingResults.affectedRows > 0){
              res.json("Service , invoice and billing address created successfully");
            }
          });
        }
      });
    }
    else{
      res.json("Service creation failed");
    }
  });
 
});

app.use('/get_invoices', (req, res) => {
  const {user_id} = req.body;
  invoice.getUserInvoices(user_id, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      Promise.all(results.map(invoice => {
        return new Promise((resolve, reject) => {
          serv.getOneService(invoice.service_id, (error, service_result) => {
            if (error) {
              console.error('Error executing MySQL query: ', error);
              reject('Server error');
              return;
            }
            if (service_result.length > 0) {
              serv.getServicePack(service_result[0].pack_id, (error, pack_result) => {
                if (error) {
                  console.error('Error executing MySQL query: ', error);
                  reject('Server error');
                  return;
                }
                if (pack_result.length > 0) {
                  resolve({
                    id: invoice.id,
                    user_id: invoice.user_id,
                    service: service_result[0],
                    pack: pack_result[0],
                    date_of_issue: invoice.date_of_issue,
                    due_date: invoice.due_date,
                    status: invoice.status,
                  });
                } else {
                  resolve(null);
                }
              });
            } else {
              resolve(null);
            }
          });
        });
      })).then((invoiceData) => {
        res.json(invoiceData.filter(invoice => invoice !== null));
      }).catch((err) => {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Server error' });
      });
    } else {
      res.json([]);
    }
  });
});

app.use('/get_tickets', (req, res) => {
  const {user_id} = req.body;
  ticket.getUserTickets(user_id, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json([]);
    }
  });
});

app.use('/create_ticket', (req, res) => {
  const { user_id, title, message, status } = req.body;

  ticket.createTicket(user_id, title, status, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      ticket.createTicketMessage(results.insertId, user_id, message, (error, messageResults) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).json({ error: 'Server error' });
          return;
        }
        if(messageResults.affectedRows > 0){
          res.json("Ticket created successfully");
        }
      });
    }
  });
});

app.use('/get_ticket_data', (req, res) => {
  const { ticket_id } = req.body;

  ticket.getTicketData(ticket_id, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      ticket.getTicketMessages(ticket_id, (error, messages_result) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).json({ error: 'Server error' });
          return;
        }
        if (messages_result.length > 0) {
          Promise.all(messages_result.map(message => {
            return new Promise((resolve, reject) => {
              user.getUserByID(message.user_id, (userError, userResult) => {
                if (userError) {
                  console.error('Error fetching user data: ', userError);
                  reject('Server error');
                  return;
                }
                if (userResult.length > 0) {
                  const user = userResult[0];
                  resolve({
                    id: message.id,
                    ticket_id: message.ticket_id,
                    user: {
                      id: user.id,
                      pic: user.picture,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      role: user.role,
                    },
                    message: message.message,
                    created_at: message.created_at,
                  });
                } else {
                  resolve([]);
                }
              });
            });
          })).then((messagesWithUsers) => {
            const ticketData = {
              id: results[0].id,
              user_id: results[0].user_id,
              title: results[0].title,
              status: results[0].status,
              created_date: results[0].created_date,
              messages: messagesWithUsers,
            };
            res.json(ticketData);
          }).catch((err) => {
            console.error('Error fetching user data: ', err);
            res.status(500).json({ error: 'Server error' });
          });
        } else {
          res.json([]);
        }
      });
    } else {
      res.json([]);
    }
  });
});

app.use('/create_ticket_message', (req, res) => {
  const { user_id, ticket_id, message } = req.body;

  ticket.createTicketMessage(ticket_id, user_id, message, (error, messageResults) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(messageResults.affectedRows > 0){
      res.json("Ticket created successfully");
    }
  });
});

app.use('/get_announcements', (req, res) => {
  ticket.getAnnouncements((error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      Promise.all(results.map(announcement => {
        return new Promise((resolve, reject) => {
          user.getUserByID(announcement.user_id, (error, announcement_result) => {
            if (error) {
              console.error('Error executing MySQL query: ', error);
              reject('Server error');
              return;
            }
            if (announcement_result.length > 0) {
              resolve({
                id: announcement.id,
                user: {
                  id: announcement_result[0].id,
                  pic: announcement_result[0].picture,
                  first_name: announcement_result[0].first_name,
                  last_name: announcement_result[0].last_name,
                  email: announcement_result[0].email,
                  role: announcement_result[0].role,
                },
                title: announcement.title,
                description: announcement.description,
                created_at: announcement.created_at,
              });
            } else {
              resolve(null);
            }
          });
        });
      })).then((invoiceData) => {
        res.json(invoiceData.filter(invoice => invoice !== null));
      }).catch((err) => {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'Server error' });
      });
    } else {
      res.json([]);
    }
  });
});

app.use('/get_cpanel_disk_usage', async (req, res) => {
  data = req.body;
  var cpanelClient = cpanel.createClient(options);

  cpanelClient.callApiNew('get_disk_usage', {"api.version": 1}, function (error, result) {
    res.json(result.data.accounts.find(account => account.user === data.username));
  });
});

app.use('/get_cpanel_url', async (req, res) => {
  const data = req.body;
  var cpanelClient = cpanel.createClient(options);

  cpanelClient.callApiNew('create_user_session', {"api.version":1,"service":"cpaneld", "user":data.username, "app":data.app}, function (error, result) {
    res.json(result.data.url);
  });
});

app.use('/get_cpanel_data', async (req, res) => {
  const data = req.body;
  var cpanelClient = cpanel.createClient(options);
  cpanelClient.callApiNew(data.method, data.parameters, function (error, result) {
    res.json(result);
  });
});

app.post('/create-payment', async (req, res) => {
  const { amount, userId } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [{
      amount: {
        currency: 'USD',
        total: amount,
      },
      description: `Add funds to wallet for user #${userId}`,
    }],
    redirect_urls: {
      return_url: 'http://localhost:5000/execute-payment',
      cancel_url: 'http://localhost:5000/cancel-payment',
    },
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).send(error);
      console.error('Error creating PayPal payment: ', error);
    } else {
      const redirectUrl = payment.links.find(link => link.rel === 'approval_url').href;
      res.json({ redirectUrl });
    }
  });
});

app.get('/execute-payment', async (req, res) => {
  const { PayerID, paymentId } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
  };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      res.status(500).send(error);
    } else {
      const userId = payment.transactions[0].description.split(' ')[5];
      const amount = parseFloat(payment.transactions[0].amount.total);

      payment.AddFunds(userId, amount, (error, results) => {
        if (error) {
          console.error('Error executing MySQL query: ', error);
          res.status(500).json({ error: 'Server error' });
          return;
        }
        if(results.affectedRows > 0){
          res.json("Payment successful and wallet updated");
        }
      });
    }
  });
});

app.get('/cancel-payment', async (req, res) => {
  res.send('Payment cancelled');
});

app.post('/get-wallet', async (req, res) => {
  const { userId } = req.body;
  wallet.getWallet(userId, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length > 0) {
      res.json(results[0].balance);
    } else {
      res.json([]);
    }
  });
});

app.post('/make-payment', async (req, res) => {
  const { userId, amount } = req.body;
  wallet.withdrawMoney(userId, amount, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      res.json("Payment successful");
    }
  });
});

app.post('/set-invoice-status', async (req, res) => {
  const { invoiceId, status } = req.body;
  invoice.setInvoiceStatus(invoiceId, status, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if(results.affectedRows > 0){
      res.json("Invoice status updated successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});