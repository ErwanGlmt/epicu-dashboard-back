DROP DATABASE IF EXISTS epicu;

CREATE DATABASE epicu
    DEFAULT CHARACTER SET = 'utf8';

USE epicu;

CREATE TABLE `user` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `role` VARCHAR(20) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL
) DEFAULT CHARACTER SET = 'utf8';

CREATE TABLE `prospect` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `comments` TEXT,
  `status` VARCHAR(50) NOT NULL
) DEFAULT CHARACTER SET = 'utf8';

CREATE TABLE `client` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `shooting_date` DATE NOT NULL,
  `publication_date` DATE NOT NULL,
  `siret_number` VARCHAR(255),
  `email` VARCHAR(255),
  `phone_number` VARCHAR(20),
  `contract_date` DATE NOT NULL,
  `invoice_date` DATE NOT NULL,
  `payment_status` ENUM('Payé', 'En attente', 'En retard') NOT NULL
) DEFAULT CHARACTER SET = 'utf8';

CREATE TABLE `file` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `availability` VARCHAR(255) NOT NULL
) DEFAULT CHARACTER SET = 'utf8';


ALTER TABLE `prospect` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `client` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);



  INSERT INTO client (name, shooting_date, publication_date, siret_number, email, phone_number, contract_date, invoice_date, payment_status) VALUES
  ("Client A", "2024-04-20", "2024-04-25", "12345678901234", "clienta@example.com", "+1234567890", "2024-04-15", "2024-04-25", "Payé"),
  ("Client B", "2024-04-22", "2024-04-27", "98765432109876", "clientb@example.com", "+9876543210", "2024-04-18", "2024-04-28", "En attente"),
  ("Client C", "2024-04-23", "2024-04-28", "24680135792468", "clientc@example.com", "+2468013579", "2024-04-20", "2024-04-30", "En retard");

INSERT INTO prospect (name, date, comments, status) VALUES
  ("Prospect A", "2024-04-20", "Intéressé par nos services", "En attente"),
  ("Prospect B", "2024-04-22", "Pas intéressé par l'offre actuelle", "Non intéressé"),
  ("Prospect C", "2024-04-25", "Nécessite plus d'informations avant de décider", "En attente");

INSERT INTO user (name, email, role, password_hash) VALUES
  ("admin@epicu.fr", "admin@epicu.fr", "admin", "$2b$10$tM/2XexSImBPGrVOi8KvLO.snC5w2UF0WeIJWQ8kKjoMiLCnuMUnS");
