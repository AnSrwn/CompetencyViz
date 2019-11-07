
// should be in a different file with restrivtive permissions
const Pool = require('pg').Pool
const pool = new Pool({
	user: 'competencyviz',
	host: 'localhost',
	database: 'competency',
	password: 'competencyviz',
	port: 5432,
})

const getTags = (request, response) => {
	pool.query('SELECT * FROM tag ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
        }

        //creating a JSON object on top level
        var resultsString = JSON.stringify(results.rows)
        var prependString = '{"tags":'
        var appendString = '}'

        resultsString = prependString.concat(resultsString, appendString)        

        response.status(200).json(JSON.parse(resultsString))
	})
}

const getTagById = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM tag WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const createTag = (request, response) => {
	const { version, created, created_by, name, a_type, description } = request.body

	pool.query('INSERT INTO tag (id, version, created, created_by, name, a_type, description) VALUES($1, $2, $3, $4, $5, $6)',
		[version, created, created_by, name, a_type, description], (error, results) => {
			if (error) {
				throw error
			}
			response.status(201).send(`Tag added with ID: ${result.insertId}`)
		})
}

const updateTag = (request, response) => {
	const id = parseInt(request.params.id)
	const { version, created, created_by, name, a_type, description } = request.body

	pool.query(
		'UPDATE tag SET version = $1, created = $2, created_by = $3, name = $4, a_type = $5, description = $6 WHERE id = $7',
		[version, created, created_by, name, a_type, description, id],
		(error, results) => {
			if (error) {
				throw error
			}
			response.status(200).send(`Tag modified with ID: ${id}`)
		}
	)
}

const deleteTag = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM tag WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`Tag deleted with ID: ${id}`)
	})
}

module.exports = {
	getTags,
	getTagById,
	createTag,
	updateTag,
	deleteTag
}