USE AUVER2_DB;

CREATE TABLE `User` (
  `user_name` varchar(255) PRIMARY KEY NOT NULL,
  `password` varchar(255) NOT NULL,
  `creation_time` timestamp DEFAULT (now()),
  `deletion_time` timestamp DEFAULT null
);

CREATE TABLE `Board` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Task` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `board_id` integer,
  `title` varchar(255) DEFAULT "",
  `text` TEXT,
  `creation_time` timestamp DEFAULT (now()),
  `deletion_time` timestamp DEFAULT null
);

CREATE TABLE `Label` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `creation_time` timestamp DEFAULT (now()),
  `deletion_time` timestamp DEFAULT null
);

CREATE TABLE `History` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `action` varchar(255),
  `creation_time` timestamp DEFAULT (now())
);

ALTER TABLE `User` COMMENT = 'One person, that is using the software';

ALTER TABLE `Board` COMMENT = 'Groups tasks into one topic like "in progress"';

ALTER TABLE `Task` COMMENT = 'Singe task that has to be done';

ALTER TABLE `Label` COMMENT = 'Assign specification to a task';

CREATE TABLE `User_Task` (
  `User_user_name` varchar(255),
  `Task_id` integer,
  PRIMARY KEY (`User_user_name`, `Task_id`)
);

ALTER TABLE `User_Task` ADD FOREIGN KEY (`User_user_name`) REFERENCES `User` (`user_name`);

ALTER TABLE `User_Task` ADD FOREIGN KEY (`Task_id`) REFERENCES `Task` (`id`);


ALTER TABLE `Task` ADD FOREIGN KEY (`board_id`) REFERENCES `Board` (`id`);

CREATE TABLE `Label_Task` (
  `Label_id` integer,
  `Task_id` integer,
  PRIMARY KEY (`Label_id`, `Task_id`)
);

ALTER TABLE `Label_Task` ADD FOREIGN KEY (`Label_id`) REFERENCES `Label` (`id`);

ALTER TABLE `Label_Task` ADD FOREIGN KEY (`Task_id`) REFERENCES `Task` (`id`);

