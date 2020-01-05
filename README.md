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

## Setup ##
<p align="justify">

### Database ###

1.  Install PostgreSQL
2.	Create User and Database, e.g.:
>  User: „competencyviz“<br>
>  Database: „competency“<br>
>  Password: „competencyviz“<br><br>
>  If different data is chosen, it must be changed in [tagQueries.js](server/node-api-postgres/tagQueries.js) and [tagParentsQueris.js](server/node-api-postgres/tagParentsQueries.js).<br>

3.	Change Encoding: `set client_encoding to ‘utf8’;`
4.	Create Tables with the file [create.sql](server/sql-data/create.sql): `\i create.sql;`
5.	Add data with the file [data-dev.sql](server/sql-data/data-dev.sql): `\i data-dev.sql;`

### Server ###

1.	Install Node.js
2.	Install Express und node-postgres modules: `npm i express pg`
3.	Start server: `node index.js`

### Client ###

1.  Install Unreal Engine 4
2.  Open the [Unreal Project](client/CompetencyViz/CompetencyViz.uproject)
3.  Change the IP-address in the variable *URL* in the class [BP_VariableStore](client/CompetencyViz/Content/Blueprints/BP_VariableStore.uasset). Standard is localhost.

#### Android ####

1.  In Unreal Engine 4 go to File --> Package Project --> Android --> Android (ETC1) **OR:** Connect you device, click on Launch and choose your device
1.	The APK can now be found in Binaries/Android. Copy it to your device and install the APK.
2.	Eventually ARCore must be installed

#### Web ####

1.  In Unreal Engine 4 go to File --> Package Project --> HTML5 **OR:** Click on Launch and choose a browser
2.  The files can now be found in Binaries/HTML5
3.  With HTML5LaunchHelper.exe a test server can be started
4.  Now you can use the URL [http://localhost:8000//CompetencyViz.html](http://localhost:8000//CompetencyViz.html)


## Usage ##
<p align="justify">

### Position the visualization in AR ###
After starting the Android-Application, it starts to search for planes. If one is found, it is marked like in the image below.

![alt text](documentation/Plane.png "Visualization of a plane")

Now you can touch at a point inside the rectangle and the visualization will be positioned at this point.

### Moving objects ###
Objects can be moved with Drag/Move Touch (Web: Middle Mouse).

### Store competencies ###
You can store competencies by putting them on the storage place. You can use them later in another part of the visualization.

![alt text](documentation/StoargePlace.png "StoragePlace")

### Show details of competency ###
Double touch (Web: Right Mouse) on a competency. Now the description is visible, the path to the root competencies and all direct children.

![alt text](documentation/CompetencyDetails.png "Details of competency")

### Create competency ###
Long Touch (Web: Long Left Mouse) on the recycle bin. Now input fields open and you can enter name, type and a description.

### Create relation ###
Move a competency object on an existing relation.<br>
**OR:** <br>
Get physically closer to a competency object until a button is shown. After a touch (Web: Left Mouse) on the button, a sphere is shown, which can be moved with Drag/Move touch. If dropped on another competency, a relation will be created.

### Delete competency ###
Move competency with Drag/Move touch to the recycling bin.

### Delete relation ###
Touch (Web: Left Mouse) on a relation.

### Edit competency attributes ###
Double touch (Web: Right Mouse) on a competency to show the details. Next to the description there is an Edit button. After touching it, there will be input fields for name, type and description.
  
## Future objectives ##