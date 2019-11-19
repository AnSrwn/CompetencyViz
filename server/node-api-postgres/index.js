const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const tagTable = require('./tagQueries')
const tagParentsTable = require('./tagParentsQueries')

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
    })
)
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost/CompViz/CompetencyViz.html']);
});
app.get('/', (request, response) => {
	response.json({ info: 'Competencies API' })
})

app.get('/tags', tagTable.getTags)
app.get('/tags/:id', tagTable.getTagById)
app.post('/tags', tagTable.createTag)
app.put('/tags/:id', tagTable.updateTag)
app.delete('/tags/:id', tagTable.deleteTag)

app.get('/tag-parents', tagParentsTable.getTagParents)
app.get('/tag-parents/:id', tagParentsTable.getTagParentsById)
app.get('/tag-children/:id', tagParentsTable.getTagChildrenById)
app.post('/tag-parents', tagParentsTable.createTagParents)
app.delete('/tag-parents/:id', tagParentsTable.deleteTagParents)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})