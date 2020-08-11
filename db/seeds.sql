
INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)

VALUES 
    ('Jon', 'Snow', 2, 1),
    ('Gregor', 'Clegane', 4, 2),
    ('Arya', 'Stark', 5, NULL),
    ('Jorah', 'Mormont', 4, 1),
    ('Cersei', 'Lannister', 1, NULL),
    ('Daenerys', 'Targaryen', 1, NULL),
    ('Olenna', 'Tyrell', 3, 1);

INSERT INTO department
    (name)
VALUES
    ('Legal'),
    ('Finance');

INSERT INTO roles 
    (title, salary, department_id)
VALUES
    ('Chief Executive Officer', 500000, 1),
    ('Lead Analyst', 125000, 2),
    ('Financial Advisor', 200000, 3),
    ('Director of Facilities', 80000, 4),
    ('Freelance Consultant', 45000, 5);




