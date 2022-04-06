-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 06-04-2022 a las 03:01:26
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
-- Base de datos: `meckdb`
--

--
-- Volcado de datos para la tabla `byroom`
--

INSERT INTO `byroom` (`id`, `room`) VALUES
(1, 'Master Bedroom'),
(2, 'Kitchen'),
(3, 'Bathroom'),
(4, 'Living Room'),
(5, 'Garden'),
(6, 'Office'),
(7, 'Play Room');

--
-- Volcado de datos para la tabla `bytexture`
--

INSERT INTO `bytexture` (`id`, `texture`) VALUES
(1, 'Wood'),
(2, 'Fabric'),
(3, 'Matte'),
(4, 'Glass'),
(5, 'Cast Iron'),
(6, 'Ceramic');

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id`, `color`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Black', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(2, 'Beige', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(3, 'White', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(5, 'Maple', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(6, 'Nogal', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(7, 'Grey', '2022-03-16 05:00:00', '2022-03-16 00:00:00', '2022-03-16 00:00:00'),
(8, 'Salmon', '2022-03-24 18:36:30', '2022-03-24 13:36:30', NULL);

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `byRoomId`, `byTextureId`, `image`, `createdAt`, `updatedAt`, `deletedAt`, `stock`) VALUES
(11, 'Reloj Moderno', '2500', 'Diseño único', 4, 4, '1-6.jpg', '2022-03-31 23:22:15', '2022-03-24 19:11:40', NULL, NULL),
(12, 'Funny Bottle', '350', 'Prepara tu infusion favorita en esta botella de diseño exclusivo', 2, 4, '1-9.jpg', '2022-03-31 23:22:38', '2022-03-24 19:11:52', NULL, NULL),
(17, 'Termo To Go', '1500', 'Botella térmica ', 6, 3, '1-17.jpg', '2022-03-31 23:22:59', '2022-03-24 19:12:29', NULL, NULL),
(19, 'Escritorio', '5000', 'Diseño escandinavo', 6, 1, '1.jpg', '2022-03-31 23:25:23', '2022-03-24 19:12:41', NULL, NULL),
(20, 'Reloj de cocina', '2500', 'Ideal para espacios open concept minimalistas', 2, 4, '1-13.jpg', '2022-03-31 23:25:31', '2022-03-24 19:13:16', NULL, NULL),
(22, 'Silla clásica', '4500', 'Añade textura a tus espacios', 4, 1, '1-16.jpg', '2022-03-31 23:25:36', '2022-03-24 19:13:28', NULL, NULL),
(23, 'Desk chair', '4500', 'Cómoda silla para espacios de oficina', 6, 1, '1-12.jpg', '2022-03-31 23:25:41', '2022-03-24 19:13:39', NULL, NULL),
(27, 'Caballito de madera', '7000', 'Pieza unica de diseño, ideal para incentivar la creatividad en espacios de trabajo', 6, 1, '1-2.jpg', '2022-03-31 23:24:27', '2022-03-24 18:43:09', NULL, NULL),
(31, 'Kettle tradicional', '3500', 'Una pava que recuerda aquellas utilizadas en el campo sobre las salamandras', 2, 5, '1-7.jpg', '2022-03-31 23:24:44', '2022-03-24 18:47:50', NULL, NULL),
(32, 'Holder de diseño', '1500', 'Ya sea como servilletero o porta retrato, este simpático animalito de madera ilumina cualquier ambiente', 4, 1, '1-19.jpg', '2022-03-31 23:25:58', '2022-03-24 18:50:33', NULL, NULL),
(33, 'Bento basket', '6000', 'Una canasta que recuerda las bento box pero con diseño único', 2, 5, '1-10.jpg', '2022-03-31 23:26:04', '2022-03-24 18:51:43', NULL, NULL),
(34, 'Lámpara colgante', '4000', 'De terminación matte y calidez única', 4, 3, '1-1.jpg', '2022-03-31 23:26:39', '2022-03-24 18:52:41', NULL, NULL);

--
-- Volcado de datos para la tabla `product_color`
--

INSERT INTO `product_color` (`id`, `productId`, `colorId`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(18, 11, 1, '2022-03-24 18:28:27', '2022-03-24 18:28:27', NULL),
(19, 12, 7, '2022-03-24 18:37:10', '2022-03-24 18:37:10', NULL),
(20, 12, 8, '2022-03-24 18:37:10', '2022-03-24 18:37:10', NULL),
(21, 17, 7, '2022-03-24 18:39:20', '2022-03-24 18:39:20', NULL),
(22, 19, 2, '2022-03-24 18:40:03', '2022-03-24 18:40:03', NULL),
(23, 20, 3, '2022-03-24 18:40:43', '2022-03-24 18:40:43', NULL),
(24, 22, 5, '2022-03-24 18:41:37', '2022-03-24 18:41:37', NULL),
(25, 23, 6, '2022-03-24 18:42:26', '2022-03-24 18:42:26', NULL),
(26, 27, 6, '2022-03-24 18:43:09', '2022-03-24 18:43:09', NULL),
(27, 31, 1, '2022-03-24 18:47:50', '2022-03-24 18:47:50', NULL),
(28, 31, 6, '2022-03-24 18:47:50', '2022-03-24 18:47:50', NULL),
(29, 32, 6, '2022-03-24 18:50:33', '2022-03-24 18:50:33', NULL),
(30, 33, 1, '2022-03-24 18:51:43', '2022-03-24 18:51:43', NULL),
(31, 33, 5, '2022-03-24 18:51:43', '2022-03-24 18:51:43', NULL),
(32, 34, 2, '2022-03-24 18:52:41', '2022-03-24 18:52:41', NULL),
(33, 34, 8, '2022-03-24 18:52:41', '2022-03-24 18:52:41', NULL);

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `avatar`, `admin`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'lucrecia', 'salinas', 'r_rivero10@hotmail.com', '$2a$10$yGZq0ZXLbN.6JWKiHy4SluDrogU.oqm5xgoeyEMXXW7A6IhxQxQgu', '1648091217827-avatar.jpg', 0, '2022-03-24 03:06:57', '2022-03-24', NULL),
(2, 'ruberto', 'espinosa', 'eloisacardona43@gmail.com', '$2a$10$nhOqmP1zS/saNSUa8bTPPurGVZiVeOzKfNB0NMfvVEGBWzBkQB/xy', '1648093256783-avatar.jpg', 0, '2022-03-24 03:40:56', '2022-03-24', NULL),
(3, 'Trunks', 'SSJ', 'trunks@dbz.com', '$2a$10$xFHzRZogwMHB1lc6OGhqh.0i0Ef1QVezBCZlZ0ioTIoeyc77To18i', '1648146361972-avatar.jpeg', 0, '2022-03-24 18:26:02', '2022-03-24', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
