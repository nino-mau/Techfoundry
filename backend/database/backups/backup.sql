-- techfoundry.product_category definition

CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `desc` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.`user` definition

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `telephone` int NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.`order` definition

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `order_user_FK` (`user_id`),
  CONSTRAINT `order_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.product definition

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `desc` longtext NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_product_category_FK` (`category_id`),
  CONSTRAINT `product_product_category_FK` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.user_address definition

CREATE TABLE `user_address` (
  `user_id` int NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` int NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_address_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.cart definition

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`product_id`),
  KEY `cart_user_FK` (`user_id`),
  KEY `cart_product_FK` (`product_id`),
  CONSTRAINT `cart_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `cart_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- techfoundry.order_item definition

CREATE TABLE `order_item` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `order_item_product_FK` (`product_id`),
  KEY `order_item_order_FK` (`order_id`,`user_id`),
  CONSTRAINT `order_item_order_FK` FOREIGN KEY (`order_id`, `user_id`) REFERENCES `order` (`id`, `user_id`),
  CONSTRAINT `order_item_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
