// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create Express app
const app = express();

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Change this to your MySQL host
  user: 'your_username', // Change this to your MySQL username
  password: 'your_password', // Change this to your MySQL password
  database: 'enquiry_form' // Change this to your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle form submission
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
