const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const tagTable = require('./tagQueries')
const tagParentsTable = require('./tagParentsQueries')

var child_process = require('child_process');

//child_process.exec('C:\\Users\\asauerwein\\Desktop\\CompetencyViz\\server\\sql-data\\setUpTables.bat', function (error, stdout, stderr) {
//    console.log(stdout);
//});

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/**
 * Restricting allowed hosts:
 *  app.use(cors({
 *  origin: 'http://yourapp.com'
 *  }));
 */
app.use(cors());

app.get('/', (request, response) => {
    response.json({ info: 'Competencies API' })
})

app.get('/tags', tagTable.getTags)
app.get('/tags/:id', tagTable.getTagById)
app.post('/tags', tagTable.createTag)
app.put('/tags/:id', tagTable.updateTag)
app.delete('/tags', tagTable.deleteTag)

app.get('/tag-parents', tagParentsTable.getTagParents)
app.get('/tag-parents/:id', tagParentsTable.getTagParentsById)
app.get('/tag-children/:id', tagParentsTable.getTagChildrenById)
app.post('/tag-parents', tagParentsTable.createTagParents)
app.delete('/tag-parents', tagParentsTable.deleteTagParents)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})