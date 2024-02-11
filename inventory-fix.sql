CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `role` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `stok` integer,
  `price` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `supply_item` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer,
  `supply_order_id` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `product_category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer,
  `category_id` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `warehouse` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `address` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `order` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `invoice` varchar(255),
  `total_price` integer,
  `customer_id` integer,
  `warehouse_id` integer,
  `status` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `order_product` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer,
  `product_id` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `supplier` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `company_name` varchar(255),
  `address` varchar(255),
  `email` varchar(255),
  `zip_code` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `supply_order` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `invoice` varchar(255),
  `total_price` integer,
  `supplier_id` integer,
  `warehouse_id` integer,
  `status` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `product_warehouse` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `quantity` integer,
  `product_id` integer,
  `warehouse_id` integer,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

ALTER TABLE `product_category` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_category` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `order_product` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `order_product` ADD FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

ALTER TABLE `supply_order` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`);

ALTER TABLE `supply_order` ADD FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

ALTER TABLE `product_warehouse` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_warehouse` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`);

ALTER TABLE `supply_item` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `supply_item` ADD FOREIGN KEY (`supply_order_id`) REFERENCES `supply_order` (`id`);
