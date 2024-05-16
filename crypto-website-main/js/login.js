const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'enquiry_form'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const queryString = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(queryString, [username, password], (err, results, fields) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Error logging in');
      return;
    }
    if (results.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
