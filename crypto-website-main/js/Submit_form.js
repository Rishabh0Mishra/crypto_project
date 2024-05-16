const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'Rishabh1234',
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

app.post('/submit', (req, res) => {
  const { Name_, emailid, address, zipcode, country, phone } = req.body;
  const queryString = 'INSERT INTO Crypto_enquiries (Name_, emailid, address, zipcode, country, phone) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(queryString, [Name_, emailid, address, zipcode, country, phone], (err, results, fields) => {
    if (err) {
      console.error('Error inserting data into database: ' + err.stack);
      res.status(500).send('Error submitting form');
      return;
    }
    console.log('Inserted into database with ID: ', results.insertId);
    res.status(200).send('Form submitted successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
