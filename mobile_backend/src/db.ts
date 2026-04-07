import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'farminvest',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
});

// Initialize database tables for MariaDB
export const initializeDatabase = async () => {
  try {
    // Create database if not exists
    await pool.execute('CREATE DATABASE IF NOT EXISTS farminvest');
    await pool.execute('USE farminvest');
    
    // Create tables
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS investments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        farmer_name VARCHAR(255) NOT NULL,
        crop VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS farmers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        region VARCHAR(255) NOT NULL,
        crop VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create default users for testing
    await pool.execute(`
      INSERT IGNORE INTO users (username, email, password_hash) VALUES 
      ('admin', 'admin@farminvest.com', 'admin123'),
      ('demo', 'demo@farminvest.com', 'demo123'),
      ('farmer1', 'ramesh@example.com', 'password'),
      ('investor1', 'investor@example.com', 'invest123')
    `);

    // Create sample farmers
    await pool.execute(`
      INSERT IGNORE INTO farmers (name, region, crop, status) VALUES 
      ('Ramesh Kumar', 'Punjab, NW District', 'Wheat', 'ACTIVE'),
      ('Suresh Patel', 'Gujarat, Central', 'Cotton', 'ACTIVE'),
      ('Meera Singh', 'Maharashtra, West', 'Rice', 'ACTIVE'),
      ('Arjun Verma', 'Rajasthan, North', 'Soybean', 'ACTIVE'),
      ('Priya Sharma', 'Kerala, South', 'Spices', 'ACTIVE')
    `);

    console.log('MariaDB Database connected, tables created, and sample data inserted');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};
