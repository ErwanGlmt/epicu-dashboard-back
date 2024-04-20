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


-- ALTER TABLE `plant` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);


-- INSERT INTO category (name) VALUES ("Classique"),("Extérieur"), ('Plante grasse');


-- INSERT INTO plant (name, `category_id`, light, water, price, image) VALUES
--   ("Monstera",1,2,3,15, "/src/assets/monstera.jpg"),
--   ("Ficus lyrata",1,3,1,16,"/src/assets/lyrata.jpg"),
--   ("Pothos argenté",1,1,2,9,"/src/assets/pothos.jpg"),
-- 	("Calathea",1,2,3,20,"/src/assets/calathea.jpg"),
--   ("Olivier",2,3,1,25,"/src/assets/olivier.jpg"),
-- 	("Cactus",3,2,1,6,"/src/assets/cactus.jpg"),
--   ("Basilic",2,2,3,5,"/src/assets/basil.jpg"),
--   ("Succulente",3,2,1,8,"/src/assets/succulent.jpg"),
--   ("Menthe",2,2,2,4,"/src/assets/mint.jpg");

  INSERT INTO client (name, shooting_date, publication_date, siret_number, email, phone_number, contract_date, invoice_date, payment_status) VALUES
  ("Client A", "2024-04-20", "2024-04-25", "12345678901234", "clienta@example.com", "+1234567890", "2024-04-15", "2024-04-25", "Payé"),
  ("Client B", "2024-04-22", "2024-04-27", "98765432109876", "clientb@example.com", "+9876543210", "2024-04-18", "2024-04-28", "En attente"),
  ("Client C", "2024-04-23", "2024-04-28", "24680135792468", "clientc@example.com", "+2468013579", "2024-04-20", "2024-04-30", "En retard");

INSERT INTO prospect (name, date, comments, status) VALUES
  ("Prospect A", "2024-04-20", "Intéressé par nos services", "En attente"),
  ("Prospect B", "2024-04-22", "Pas intéressé par l'offre actuelle", "Non intéressé"),
  ("Prospect C", "2024-04-25", "Nécessite plus d'informations avant de décider", "En attente");

INSERT INTO user (name, email, role, password_hash) VALUES
  ("erwan@epicu", "erwan@epicu.fr", "admin", "$2b$10$tM/2XexSImBPGrVOi8KvLO.snC5w2UF0WeIJWQ8kKjoMiLCnuMUnS"),
  ("victor@epicu", "victor@epicu.fr", "admin", "$2b$10$tM/2XexSImBPGrVOi8KvLO.snC5w2UF0WeIJWQ8kKjoMiLCnuMUnS");
