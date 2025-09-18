# enrollment-system-crud-Espiritu
Project Title and Description

Student Enrollment System – A simple CRUD (Create, Read, Update, Delete) web application built using PHP (PDO) and JavaScript (Fetch API + Async/Await).
This system allows management of students, programs, years, semesters, subjects, and enrollments. It provides a responsive frontend and dynamic backend connected to the espiritu_enrollment database.

Main features include:

 Student Management (Add, Edit, Delete, View)

 Program Management (with Institute relation)

 Year & Semester Management

 Subject Management

 Enrollment Management (student–subject assignment)

 Dynamic forms and tables using Fetch API (no reloads).


 Setup Instructions
1. Requirements

XAMPP
 (or any server with PHP 7.4+ and MySQL)

Web browser (Chrome/Edge/Firefox recommended)

Git (optional, if cloning directly from GitHub)

2. Import the Database

Open phpMyAdmin (http://localhost/phpmyadmin).

Create a new database named:

espiritu_enrollment


Import the provided espiritu_enrollment.sql file into this database.

Click database → Import → Choose file → espiritu_enrollment.sql → Go.

3. Configure PHP (Database Connection)

Check the file:

/api/db.php


Make sure credentials match your local setup:

$host = 'localhost';
$db   = 'espiritu_enrollment';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

4. Run the Project

Copy project folder to your htdocs directory in XAMPP (e.g., C:/xampp/htdocs/enrollment-system-crud-Espiritu/).

Start Apache and MySQL in XAMPP Control Panel.

Open browser and go to:

http://localhost/enrollment-system-crud-Espiritu/index.html

5. Repository Link

https://github.com/swtyreya/enrollment-system-crud-Espiritu.git



Name: Reya E. Espiritu
Course/Section: BSIS 3 - A