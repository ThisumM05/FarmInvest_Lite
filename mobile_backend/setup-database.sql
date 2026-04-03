-- FarmInvest Database Setup Script
-- Run this in MySQL to set up the database

-- Set password for root user (change 'password123' to your preferred password)
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password123';

-- Create the database
CREATE DATABASE IF NOT EXISTS farminvest;
USE farminvest;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  farmer_name VARCHAR(255) NOT NULL,
  crop VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_investments_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
);

-- Insert sample user (username: demo, password: demo-password)
INSERT INTO users (username, email, password_hash) VALUES
  ('demo', 'demo@example.com', 'demo-password'),
  ('Alex Rivera', 'alex@example.com', 'alex123')
ON DUPLICATE KEY UPDATE email = VALUES(email), password_hash = VALUES(password_hash);

-- Insert sample investments
INSERT INTO investments (user_id, farmer_name, crop, amount) VALUES
  (1, 'Harish Kumar', 'Wheat', 12500.00),
  (1, 'Anita Devi', 'Rice', 8200.00),
  (1, 'Rajesh Singh', 'Barley', 15000.00),
  (1, 'Sunita Rao', 'Corn', 9580.00)
ON DUPLICATE KEY UPDATE farmer_name = VALUES(farmer_name);

-- Show success message
SELECT 'Database setup completed successfully!' as message;