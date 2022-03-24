-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 09-03-2022 a las 01:21:11
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
CREATE TABLE `byRoom` (
  `byRoomId` int(11) NOT NULL,
  `room` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `byTexture`
--

DROP TABLE IF EXISTS `byTexture`;
CREATE TABLE `byTexture` (
  `byTextureId` int(11) NOT NULL,
  `texture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cart`
--

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `paymentMethod` int(11) NOT NULL,
  `totalPay` int(11) NOT NULL,
  `itemsAmount` int(11) NOT NULL,
  `shipDate` datetime NOT NULL,
  `shipAddress` varchar(200) NOT NULL,
  `zipCode` int(11) NOT NULL,
  `country` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `colorId` int(11) NOT NULL,
  `color` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Products`
--

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `productID` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` decimal(11,0) NOT NULL,
  `description` mediumtext NOT NULL,
  `byRoomId` int(11) NOT NULL,
  `byTextureId` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
CREATE TABLE `products_cart` (
  `Id` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_color`
--

DROP TABLE IF EXISTS `product_color`;
CREATE TABLE `product_color` (
  `id` int(10) NOT NULL,
  `productId` int(11) NOT NULL,
  `colorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `byRoom`
--
ALTER TABLE `byRoom`
  ADD PRIMARY KEY (`byRoomId`);

--
-- Indices de la tabla `byTexture`
--
ALTER TABLE `byTexture`
  ADD PRIMARY KEY (`byTextureId`);

--
-- Indices de la tabla `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`colorId`);

--
-- Indices de la tabla `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `byRoomId` (`byRoomId`),
  ADD KEY `byTextureId` (`byTextureId`);

--
-- Indices de la tabla `products_cart`
--
ALTER TABLE `products_cart`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productID` (`productID`);

--
-- Indices de la tabla `product_color`
--
ALTER TABLE `product_color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `colorId` (`colorId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`byTextureId`) REFERENCES `byTexture` (`byTextureId`);

--
-- Filtros para la tabla `products_cart`
--
ALTER TABLE `products_cart`
  ADD CONSTRAINT `products_cart_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `Cart` (`cartId`),
  ADD CONSTRAINT `products_cart_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`);

--
-- Filtros para la tabla `product_color`
--
ALTER TABLE `product_color`
  ADD CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `Products` (`productID`),
  ADD CONSTRAINT `product_color_ibfk_2` FOREIGN KEY (`colorId`) REFERENCES `color` (`colorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
