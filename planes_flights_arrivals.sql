CREATE DATABASE  IF NOT EXISTS `planes_flights` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `planes_flights`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: planes_flights
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arrivals`
--

DROP TABLE IF EXISTS `arrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrivals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_town` varchar(64) COLLATE utf8_bin NOT NULL,
  `airline` varchar(32) COLLATE utf8_bin NOT NULL,
  `arrival_time` datetime NOT NULL,
  `is_late` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrivals`
--

LOCK TABLES `arrivals` WRITE;
/*!40000 ALTER TABLE `arrivals` DISABLE KEYS */;
INSERT INTO `arrivals` VALUES (1,'London','Ryanair','2021-10-22 17:00:00',0),(2,'Berlin','Ryanair','2021-10-22 17:15:00',0),(3,'Paris','Ryanair','2021-10-22 17:30:00',0),(4,'Vienna','Ryanair','2021-10-22 17:45:00',0),(5,'Frankfurt','Lufthansa','2021-10-22 18:00:00',0),(6,'Riga','Air Baltic','2021-10-22 18:15:00',0),(7,'Munich','Air Baltic','2021-10-22 18:30:00',0),(8,'Warsaw','LOT Polish Aurlines','2021-10-22 18:45:00',0),(9,'Tallinn','Air Baltic','2021-10-22 19:00:00',0),(10,'Copenhagen','Scandinavian Airlines','2021-10-22 19:15:00',0),(11,'Milan','Wizz Air','2021-10-22 19:30:00',0),(12,'Tenerife','Getjet Airlines','2021-10-22 19:45:00',0),(13,'Madeira','Avion Express','2021-10-22 20:00:00',0),(14,'Oslo','Norwegian Air Shuttle','2021-10-22 20:15:00',0),(15,'Istanbul','Turkish Airlines','2021-10-22 20:30:00',0),(16,'Helsinki','Finnair','2021-10-22 20:45:00',0),(17,'Stokholm','Wizz Air','2021-10-22 21:00:00',0),(18,'Brussels','Ryanair','2021-10-22 21:15:00',0),(19,'Dublin','Ryanair','2021-10-22 21:30:00',0),(20,'Rome','Ryanair','2021-10-22 21:45:00',0);
/*!40000 ALTER TABLE `arrivals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-22 12:42:41
