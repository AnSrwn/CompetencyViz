# CompetencyViz
<p align="justify">
CompetencyViz is an interactive visualization of competencies and their relations.
It is developed as an Anrdroid Application using Augmented Reality, but can also be 
used as a web application.

<br><br>

## Features ##
* Using Augmented Reality
* Multi-Platform: Android and Web
* CRUD functionality for competencies and their relations

<br><br>

## Setup ##
<p align="justify">
Datenbank:<br>

1.  PostgreSQL installieren
2.	User und Database anlegen, z.B:
>  User: „competencyviz“<br>
>  Database: „competency“<br>
>  Password: „competencyviz“

Wenn andere Daten gewählt werden, müssen diese in tagQueries.js und tagParentsQueris.js geändert werden.<br>

3.	Encoding ändern mit: “set client_encoding to ‘utf8’;”
4.	Tables erstellen mit der Datei create.sql („\i create.sql;“).
5.	Daten hinzufügen mit der Datei data-dev.sql („\i data-dev.sql;“).

Server:<br>

1.	Node.js installieren
2.	Express und node-postgres Module installieren („npm i express pg“).
3.	Server starten mit „node index.js“.

Client:<br>
Gegebenfalls muss die IP-Adresse in der Variable *URL* in der Klasse *BP_VariableStore* geändert werden (Standard: localhost). Dazu muss die Datei mit Unreal Engine 4 geöffnet werden.
Android:
1.	CompetencyViz.apk muss auf einem Android-Handheld installiert werden. 
2.	Eventuell muss Google Play-Dienste für AR installiert werden, um CompetencyViz zu nutzen.

Web:
1.	In dem Ordner HTML5 sind alle benötigten Dateien zu finden. 
2.	HTML5LaunchHelper.exe startet einen Testserver. 
3.	Unter http://localhost:8000//CompetencyViz.html kann CompetencyViz nun getestet werden.


## Usage ##
<p align="justify">

<br><br>
  
## Future objectives ##