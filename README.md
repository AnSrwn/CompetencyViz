# CompetencyViz
<p align="justify">
CompetencyViz is an interactive visualization of competencies and their relations.
It is developed as an Anrdroid Application using Augmented Reality, but can also be 
used as a web application.

<br>

## Features ##
* Using Augmented Reality
* Multi-Platform: Android and Web
* CRUD functionality for competencies and their relations

<br>

## Setup ##
<p align="justify">
Database:<br>

1.  Install PostgreSQL
2.	Create User and Database, e.g.:
>  User: „competencyviz“<br>
>  Database: „competency“<br>
>  Password: „competencyviz“<br><br>
>  If different data is chosen, it must be changed in [tagQueries.js](server/node-api-postgres/tagQueries.js) and [tagParentsQueris.js](server/node-api-postgres/tagParentsQueries.js).<br>

3.	Change Encoding: `set client_encoding to ‘utf8’;`
4.	Create Tables with the file [create.sql](server/sql-data/create.sql): `\i create.sql;`
5.	Add data with the file [data-dev.sql](server/sql-data/data-dev.sql): `\i data-dev.sql;`

Server:<br>

1.	Install Node.js
2.	Install Express und node-postgres modules: `npm i express pg`
3.	Start server: `node index.js`

Client:<br>
1.  Install Unreal Engine 4
2.  Open the [Unreal Project](client/CompetencyViz/CompetencyViz.uproject)
3.  Change the IP-address in the variable *URL* in the class [BP_VariableStore](client/CompetencyViz/Content/Blueprints/BP_VariableStore.uasset). Standard is localhost.

Android:
1.  In Unreal Engine 4 go to File --> Package Project --> Android --> Android (ETC1) **OR:** Connect you device, click on Launch and choose your device
1.	The APK can now be found in Binaries/Android. Copy it to your device and install the APK.
2.	Eventually ARCore must be installed

Web:
1.  In Unreal Engine 4 go to File --> Package Project --> HTML5 **OR:** Click on Launch and choose a browser
2.  The files can now be found in Binaries/HTML5
3.  With HTML5LaunchHelper.exe a test server can be started
4.  Now you can use the URL [http://localhost:8000//CompetencyViz.html](http://localhost:8000//CompetencyViz.html)


## Usage ##
<p align="justify">

<br><br>
  
## Future objectives ##