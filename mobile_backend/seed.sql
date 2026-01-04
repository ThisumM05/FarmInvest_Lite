-- Seed data for FarmInvest Lite

USE farminvest;

INSERT INTO users (username, email, password_hash) VALUES
  ('demo', 'demo@example.com', 'demo-password')
ON DUPLICATE KEY UPDATE email = VALUES(email), password_hash = VALUES(password_hash);

INSERT INTO investments (user_id, farmer_name, crop, amount) VALUES
  (1, 'Farmer Alice', 'Maize', 1000.00),
  (1, 'Farmer Bob', 'Wheat', 1500.50)
ON DUPLICATE KEY UPDATE farmer_name = VALUES(farmer_name);
