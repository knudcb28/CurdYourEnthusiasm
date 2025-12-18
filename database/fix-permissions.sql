-- Fix MySQL Permissions for Curd Your Enthusiasm
-- Run this in MySQL Workbench

-- Grant permissions for root user from both localhost and 127.0.0.1
GRANT ALL PRIVILEGES ON curd_your_enthusiasm.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON curd_your_enthusiasm.* TO 'root'@'127.0.0.1';

-- Reload privileges to apply changes
FLUSH PRIVILEGES;

-- Verify permissions
SHOW GRANTS FOR 'root'@'localhost';

