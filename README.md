# AngularBePP2

SQL script to boot the DB: 
```
CREATE DATABASE cow_farm;
USE cow_farm;
CREATE TABLE cows(
	id INT  AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	weight DECIMAL(6, 2)  NOT NULL,
	total_milk DECIMAL(7, 1)  NOT NULL,
	last_milking_time DATETIME NOT NULL
);

SELECT * FROM cows;
```
```
Database (MySQL) dump file: "cow_farm_cows.sql"
```