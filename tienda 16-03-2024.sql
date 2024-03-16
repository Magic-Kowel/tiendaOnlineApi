-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-03-2024 a las 18:00:55
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relvariacionproducto`
--

CREATE TABLE `relvariacionproducto` (
  `ecodVariacionproducto` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ecodTallavariacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ecodProductos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nPrecio` float(6,2) NOT NULL,
  `nStock` int(3) NOT NULL,
  `bPrincipal` tinyint(1) DEFAULT 0,
  `ecodEstatus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `relvariacionproducto`
--

INSERT INTO `relvariacionproducto` (`ecodVariacionproducto`, `ecodTallavariacion`, `ecodProductos`, `nPrecio`, `nStock`, `bPrincipal`, `ecodEstatus`) VALUES
('06d83e74d4ea5cd4310e33948b7788dd', '1cf158c79626d9ba383260a736ec44a5', '44ff52a81450dc1ea6e342c40dc60aae', 3.00, 3, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a'),
('0f5238b2e8c33903144b718f067479bc', 'f60d5daecdcd32f4c9688e1985cd8462', '680f5238b2e8c33903144b718f067479', 4.00, 4, 1, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('14f03410fef7f439b3fc9039bd63b14f', 'cf158c79626d9ba383260a736ec44a58', '44ff52a81450dc1ea6e342c40dc60aae', 6.00, 66, 1, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('4ff52a81450dc1ea6e342c40dc60aae5', '0d5daecdcd32f4c9688e1985cd84628d', '44ff52a81450dc1ea6e342c40dc60aae', 1.00, 2, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a'),
('6d83e74d4ea5cd4310e33948b7788dd1', '1cf158c79626d9ba383260a736ec44a5', '44ff52a81450dc1ea6e342c40dc60aae', 3.00, 3, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a'),
('74d4ea5cd4310e33948b7788dd1d7bdf', '1cf158c79626d9ba383260a736ec44a5', '44ff52a81450dc1ea6e342c40dc60aae', 3.00, 3, 0, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('80f5238b2e8c33903144b718f067479b', '0d5daecdcd32f4c9688e1985cd84628d', '680f5238b2e8c33903144b718f067479', 1.00, 2, 0, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('a006d83e74d4ea5cd4310e33948b7788', '0d5daecdcd32f4c9688e1985cd84628d', '44ff52a81450dc1ea6e342c40dc60aae', 77.00, 75, 0, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('d83e74d4ea5cd4310e33948b7788dd1d', '1cf158c79626d9ba383260a736ec44a5', '44ff52a81450dc1ea6e342c40dc60aae', 3.00, 3, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a'),
('f5238b2e8c33903144b718f067479bca', 'cf158c79626d9ba383260a736ec44a58', '680f5238b2e8c33903144b718f067479', 5.00, 5, 0, '2660376e-dbf8-44c1-b69f-b2554e3e5d4c'),
('f52a81450dc1ea6e342c40dc60aae5c1', 'cf158c79626d9ba383260a736ec44a58', '44ff52a81450dc1ea6e342c40dc60aae', 5.00, 5, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a'),
('ff52a81450dc1ea6e342c40dc60aae5c', 'f60d5daecdcd32f4c9688e1985cd8462', '44ff52a81450dc1ea6e342c40dc60aae', 4.00, 4, 0, 'fa6cc9a2-f221-4e27-b575-1fac2698d27a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `relvariacionproducto`
--
ALTER TABLE `relvariacionproducto`
  ADD PRIMARY KEY (`ecodVariacionproducto`),
  ADD KEY `ecodTallavariacion` (`ecodTallavariacion`),
  ADD KEY `ecodProductos` (`ecodProductos`),
  ADD KEY `ecodEstatus` (`ecodEstatus`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `relvariacionproducto`
--
ALTER TABLE `relvariacionproducto`
  ADD CONSTRAINT `relvariacionproducto_ibfk_1` FOREIGN KEY (`ecodTallavariacion`) REFERENCES `tallavariacion` (`ecodTallavariacion`),
  ADD CONSTRAINT `relvariacionproducto_ibfk_2` FOREIGN KEY (`ecodProductos`) REFERENCES `catproductos` (`ecodProductos`),
  ADD CONSTRAINT `relvariacionproducto_ibfk_3` FOREIGN KEY (`ecodEstatus`) REFERENCES `catestatus` (`ecodEstatus`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
