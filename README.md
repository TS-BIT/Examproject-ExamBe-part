# ExamBe

SQL script to boot the DB: 
```
CREATE DATABASE planes_flights;
USE planes_flights;
CREATE TABLE arrivals(
	id INT(11) AUTO_INCREMENT PRIMARY KEY, UNIQUE,
	from_town VARCHAR(64) NOT NULL,
	airline VARCHAR(32) NOT NULL,
	arrival_time DATETIME NOT NULL
	is_late TINYINT(1)  NOT NULL
);

SELECT * FROM arrivals;
```
```
Database (MySQL) dump file: "planes_flights_arrivals.sql"
```