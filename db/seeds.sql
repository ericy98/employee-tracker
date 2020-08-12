USE employees;

INSERT INTO department
    (name)
VALUES
    ('Legal'),
    ('Finance')
    ('Development');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Chief Executive Officer', 500000, 1),
    ('Chief Executive Officer', 500000, 2),
    ('Lead Analyst', 125000, 1),
    ('Financial Advisor', 200000, 1),
    ('Director of Facilities', 80000, 1),
    ('Director of Facilities', 80000, 2),
    ('Freelance Consultant', 45000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)

VALUES 
    ('Jon', 'Snow', 3, 6),
    ('Gregor', 'Clegane', 6, 5),
    ('Arya', 'Stark', 7, NULL),
    ('Jorah', 'Mormont', 5, 6),
    ('Cersei', 'Lannister', 2, NULL),
    ('Daenerys', 'Targaryen', 1, NULL),
    ('Olenna', 'Tyrell', 4, 6);




