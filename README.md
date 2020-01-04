# CompetencyViz
<p align="justify">
CompetencyViz is an interactive visualization of competencies and their relations.
It is developed as an Anrdroid Application using Augmented Reality, but can also be 
used as a web application.

<br><br>

## Features ##
<p align="justify">
*  Using Augmented Reality<br>
*  Multi-Platform: Android and Web<br>
*  CRUD functionality for competencies and their relations<br>

<br><br>

## Setup ##
<br>
<p align="justify">
### Server ###
<br>
#### Datenbank: ####
1.	PostgreSQL installieren
2.	User und Database anlegen, z.B:
>  User: „competencyviz“
>  Database: „competency“
>  Password: „competencyviz“
    Wenn andere Daten gewählt werden, müssen diese in tagQueries.js und tagParentsQueris.js geändert werden.
3.	Encoding ändern mit: “set client_encoding to ‘utf8’;”
4.	Tables erstellen mit der Datei create.sql („\i create.sql;“).
5.	Daten hinzufügen mit der Datei data-dev.sql („\i data-dev.sql;“).


<br><br>

## Usage ##
<p align="justify">

<br><br>
  
## Future objectives ##