/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Comments`;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user` (`userId`),
  KEY `fk_comments_image` (`imageId`),
  CONSTRAINT `fk_comments_image` FOREIGN KEY (`imageId`) REFERENCES `Images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Images`;
CREATE TABLE `Images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_images_user` (`userId`),
  CONSTRAINT `fk_images_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ImagesSave`;
CREATE TABLE `ImagesSave` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_image_save_user` (`userId`),
  KEY `fk_image_save_image` (`imageId`),
  CONSTRAINT `fk_image_save_image` FOREIGN KEY (`imageId`) REFERENCES `Images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_image_save_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Comments` (`id`, `content`, `userId`, `imageId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(24, 'Ảnh này đẹp thật đó!', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(25, 'Bức ảnh này chụp ở đâu vậy bạn?', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(26, 'Nhìn ánh sáng trong ảnh rất tốt!', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(27, 'Ảnh hơi mờ nhưng vẫn đẹp ^^', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(28, 'Rất thích phong cách chụp này', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(29, 'Màu ảnh chỉnh hơi cháy, góp ý nhẹ thôi nha 😄', 1, 6, 0, 0, NULL, '2025-11-03 21:27:56', '2025-11-03 21:27:56'),
(31, 'Ảnh đẹp quá, hẹ hẹ', 1, 6, 0, 0, NULL, '2025-11-09 21:00:36', '2025-11-09 21:00:36'),
(32, 'Ảnh đẹp quá, hẹ hẹ ádasd', 1, 6, 0, 0, NULL, '2025-11-09 21:00:57', '2025-11-09 21:00:57');
INSERT INTO `Images` (`id`, `name`, `url`, `desc`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(6, 'Sunset Beach', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Hoàng hôn trên bãi biển tuyệt đẹp', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(7, 'Mountain View', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', 'Khung cảnh núi non hùng vĩ', 1, 1, 1, '2025-11-09 21:02:35', '2025-11-03 20:31:28', '2025-11-09 21:02:35'),
(8, 'City Night', 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63', 'Thành phố lung linh về đêm', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(9, 'Forest Path', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', 'Lối mòn trong rừng rậm yên tĩnh', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(10, 'Desert Dunes', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', 'Cồn cát trải dài dưới ánh nắng vàng', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(11, 'Ocean Wave', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Sóng biển cuộn trào mạnh mẽ', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(12, 'Snow Mountain', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', 'Ngọn núi phủ đầy tuyết trắng', 1, 1, 1, '2025-11-04 00:29:50', '2025-11-03 20:31:28', '2025-11-04 00:29:49'),
(13, 'Flower Field', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6', 'Cánh đồng hoa rực rỡ sắc màu', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(14, 'Lake Reflection', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 'Mặt hồ phản chiếu trời mây tuyệt đẹp', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(15, 'Old Bridge', 'https://images.unsplash.com/photo-1499696010180-025efb0b4d84', 'Cây cầu cổ bắc qua dòng sông lớn', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(16, 'Street Market', 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0', 'Khu chợ đường phố sầm uất, đầy sắc màu', 1, 0, 0, NULL, '2025-11-03 20:31:28', '2025-11-03 20:31:28'),
(17, NULL, 'kgaohgx4c3nethjgudxj', NULL, 1, 0, 0, NULL, '2025-11-09 19:10:34', '2025-11-09 19:10:34'),
(18, NULL, 'q2kv5mu8c9utmyooupjj', NULL, 1, 0, 0, NULL, '2025-11-09 19:10:57', '2025-11-09 19:10:57'),
(19, NULL, 'osh5qol4wc9ncfprj1wo', NULL, 1, 0, 0, NULL, '2025-11-09 19:11:31', '2025-11-09 19:11:31'),
(20, NULL, 'demo/ilty8adnuix3glzcpdwe', NULL, 1, 0, 0, NULL, '2025-11-09 19:16:20', '2025-11-09 19:16:20'),
(21, NULL, 'demo/otmwdzt0ombrbf4vgozo', NULL, 1, 0, 0, NULL, '2025-11-09 19:24:59', '2025-11-09 19:24:59'),
(22, 'name demo', 'demo/umjmfqntpegligvxiga2', 'desc demo', 1, 0, 0, NULL, '2025-11-09 19:27:08', '2025-11-09 19:27:08'),
(23, 'name demo', 'demo/u9x2ewu7qbecgwmrtkct', 'desc demo', 1, 0, 0, NULL, '2025-11-09 21:08:38', '2025-11-09 21:08:38'),
(24, 'name demo', 'demo/nu2uixtjzq4rlurt2lym', 'desc demo', 1, 0, 0, NULL, '2025-11-09 21:09:20', '2025-11-09 21:09:20');
INSERT INTO `ImagesSave` (`id`, `userId`, `imageId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(6, 1, 6, 0, 1, '2025-11-03 22:27:53', '2025-11-03 22:26:48', '2025-11-03 22:27:52'),
(7, 1, 6, 0, 1, '2025-11-03 22:27:57', '2025-11-03 22:27:56', '2025-11-03 22:27:57'),
(8, 1, 6, 0, 1, '2025-11-03 22:28:16', '2025-11-03 22:28:08', '2025-11-03 22:28:15'),
(9, 1, 6, 0, 1, '2025-11-03 22:28:31', '2025-11-03 22:28:25', '2025-11-03 22:28:30'),
(10, 1, 6, 0, 1, '2025-11-03 22:30:37', '2025-11-03 22:30:36', '2025-11-03 22:30:36'),
(11, 1, 6, 0, 1, '2025-11-09 20:57:06', '2025-11-03 22:30:44', '2025-11-09 20:57:05'),
(12, 1, 7, 0, 0, NULL, '2025-11-04 00:14:03', '2025-11-04 00:14:03'),
(13, 1, 6, 0, 1, '2025-11-09 20:58:19', '2025-11-09 20:57:44', '2025-11-09 20:58:18'),
(14, 1, 6, 0, 0, NULL, '2025-11-09 20:58:53', '2025-11-09 20:58:53');
INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `age`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'demo@demo.com', 'Nguyễn Văn L', 'demo/jbdbs8e93vb0bvfhchcd', '$2b$10$.bnDt/S7zwINNUC3cf5.Zux8r/miE.ztpLy6agCM7wMhAlRww5XJy', 90, NULL, NULL, 2, 0, 0, NULL, '2025-11-03 20:07:53', '2025-11-09 21:11:14'),
(7, 'demo2@demo.com', 'Nguyễn Văn B', NULL, '$2b$10$ABnRIAxHmntkICa/4vx22ec1V/FCOu7sGCwO0T3oZY4/B7.xS11I6', 19, NULL, NULL, 2, 0, 0, NULL, '2025-11-09 20:53:59', '2025-11-09 20:53:59');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;