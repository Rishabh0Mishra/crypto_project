create database enquiry_form;
use enquiry_form;
CREATE TABLE Crypto_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name_ VARCHAR(255) NOT NULL,
    emailid VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    zipcode INT NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT* FROM Crypto_enquiries ;