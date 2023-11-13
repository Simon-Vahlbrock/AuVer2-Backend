USE AUVER2_DB;

INSERT INTO `User` (`user_name`, `password`) VALUES
                                                 ('user1', 'password1'),
                                                 ('user2', 'password2');

INSERT INTO `Board` (`name`) VALUES
    ('Board 1');

INSERT INTO `Task` (`board_id`, `title`, `text`) VALUES
    (1, 'Task 1', 'Description for Task 1');

INSERT INTO `Label` (`name`, `color`) VALUES
    ('Label 1', 'Red');

INSERT INTO `User_Task` (`User_user_name`, `Task_id`) VALUES
    ('user1', 1);

INSERT INTO `Label_Task` (`Label_id`, `Task_id`) VALUES
    (1, 1);