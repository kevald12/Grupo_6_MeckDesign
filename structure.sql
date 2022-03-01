-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 01-03-2022 a las 01:35:24
-- Versión del servidor: 5.7.34
-- Versión de PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `meckDB`
--
CREATE DATABASE IF NOT EXISTS `meckDB` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `meckDB`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `byRoom`
--

DROP TABLE IF EXISTS `byRoom`;
CREATE TABLE IF NOT EXISTS `byRoom` (
  `byRoomId` int(11) NOT NULL,
  `room` varchar(200) NOT NULL,
  PRIMARY KEY (`byRoomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `byTexture`
--

DROP TABLE IF EXISTS `byTexture`;
CREATE TABLE IF NOT EXISTS `byTexture` (
  `byTextureId` int(11) NOT NULL,
  `texture` varchar(200) NOT NULL,
  PRIMARY KEY (`byTextureId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cart`
--

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE IF NOT EXISTS `Cart` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentMethod` int(11) NOT NULL,
  `totalPay` int(11) NOT NULL,
  `itemsAmount` int(11) NOT NULL,
  `shipDate` datetime NOT NULL,
  `shipAddress` varchar(200) NOT NULL,
  `zipCode` int(11) NOT NULL,
  `country` varchar(200) NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

DROP TABLE IF EXISTS `color`;
CREATE TABLE IF NOT EXISTS `color` (
  `colorId` int(11) NOT NULL,
  `color` varchar(200) NOT NULL,
  PRIMARY KEY (`colorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Products`
--

DROP TABLE IF EXISTS `Products`;
CREATE TABLE IF NOT EXISTS `Products` (
  `productID` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `byRoomId` int(11) NOT NULL,
  `byTextureId` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `colorId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`productID`),
  KEY `byRoomId` (`byRoomId`),
  KEY `byTextureId` (`byTextureId`),
  KEY `colorId` (`colorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
CREATE TABLE IF NOT EXISTS `products_cart` (
  `Id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `cartId` (`cartId`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Filtros para la tabla `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`byRoomId`) REFERENCES `byRoom` (`byRoomId`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`byTextureId`) REFERENCES `byTexture` (`byTextureId`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`colorId`) REFERENCES `color` (`colorId`);

--
-- Filtros para la tabla `products_cart`
--
ALTER TABLE `products_cart`
  ADD CONSTRAINT `products_cart_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `Cart` (`cartId`),
  ADD CONSTRAINT `products_cart_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
