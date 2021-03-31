USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"), ("IT"), ("Engineering"), ("Human Rsources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1), ("Sales Associate", 60000, 1),
("IT Mangager", 80000, 2), ("IT Person", 60000, 2),
("Engineer Manager", 200000, 3), ("Engineer", 150000, 3),
("HR Manager", 80000, 4), ("HR Associate", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Rodgers", 1, null), ("James", "Barnes", 2, 1),
("Nick", "Fury", 3, null), ("Maria", "Hill", 4, 3),
("Tony", "Stark", 5, null), ("James", "Rhodes", 6, 5),
("Pepper", "Potts", 7, null), ("Happy", "Hogan", 8, 7);