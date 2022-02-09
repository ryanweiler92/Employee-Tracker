INSERT INTO department (name)
VALUES
("The Lanisters"),
("The Starks"),
("The Targaryens");

INSERT INTO role (title, salary, department_id)
VALUES 
('Manager of Kings Landing', 100000, 1),
('Manager of Winterfell', 100000, 2),
('Manager of Dragonstone', 100000, 3),
('Master of War Kings Landing', 80000, 1),
('Master of War Winterfell', 80000, 2),
('Master of War Dragonstone', 80000, 3),
('Hand of the Manager Kings Landing', 60000, 1),
('Hand of the Manager Winterfell', 60000, 2),
('Hand of the Manager Dragonstone', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Cersei', 'Lannister', 1, NULL),
('Robb', 'Stark', 2, NULL),
('Daenerys', 'Targaryen', 3, NULL),
('Jaime', 'Lannister', 4, 1),
('Jon', 'Snow', 5, 2),
('Grey', 'Worm', 6, 3),
('Tyrion', 'Lannister', 7, 1),
('Sansa', 'Stark', 8, 2),
('Jorah', 'Mormont', 9, 3);