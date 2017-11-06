DROP DATABASE IF EXISTS `burgers_db`;
CREATE DATABASE `burgers_db`;
USE `burgers_db`;

DROP TABLE IF EXISTS `burgers`;
CREATE TABLE `burgers` (
    `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `burger_name` VARCHAR(100) NOT NULL DEFAULT 'Burger',
    `devoured` BOOLEAN NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL,
    `devoured_at` DATETIME
);
