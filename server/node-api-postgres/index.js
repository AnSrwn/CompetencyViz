const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const tagTable = require('./tagQueries')
const tagParentsTable = require('./tagParentsQueries')

var child_process = require('child_process');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

/**
 * If there is a static URL, this should be used instead of app.use(cors()).
 * 
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
app.put('/tags', tagTable.updateTag)
app.delete('/tags', tagTable.deleteTag)

app.get('/tag-parents', tagParentsTable.getTagParents)
app.get('/tag-parents/:id', tagParentsTable.getTagParentsById)
app.get('/tag-children/:id', tagParentsTable.getTagChildrenById)
app.post('/tag-parents', tagParentsTable.createTagParents)
app.delete('/tag-parents', tagParentsTable.deleteTagParents)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})