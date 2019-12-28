
// should be in a different file with restrivtive permissions
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'competencyviz',
    host: 'localhost',
    database: 'competency',
    password: 'competencyviz',
    port: 5432,
})

const getTagParents = (request, response) => {
    pool.query('SELECT * FROM tag_parents ORDER BY tag_id ASC', (error, results) => {
        if (error) {
            throw error
        }

        //creating a JSON object on top level
        const resultsString = JSON.stringify({tagParents: results.rows})

        response.status(200).json(JSON.parse(resultsString))
    })
}

const getTagParentsById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM tag_parents WHERE tag_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        //creating a JSON object on top level
        const resultsString = JSON.stringify({ tagParents: results.rows })

        response.status(200).json(JSON.parse(resultsString))
    })
}

const getTagChildrenById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM tag_parents WHERE parents_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }

        //creating a JSON object on top level
        const resultsString = JSON.stringify({ tagChildren: results.rows })

        response.status(200).json(JSON.parse(resultsString))
    })
}

const createTagParents = async (request, response) => {
    var tagParents = request.body.tagParents

    tagParents.forEach(async ({ tag_id, parents_id }) => {
        await pool
            .query('INSERT INTO tag_parents (tag_id, parents_id) VALUES($1, $2)', [tag_id, parents_id])
            .catch(error => console.error('Error executing query', error.stack))
    })

    response.status(201).send(`tag_parents added`)
}

const deleteTagParents = async (request, response) => {
    const { tag_id, parents_id } = request.body

    await pool
        .query('DELETE FROM tag_parents WHERE tag_id = $1 AND parents_id = $2', [tag_id, parents_id])
        .catch(error => console.error('Error executing query', error.stack))

    response.status(200).send(`Relation ${tag_id} to ${parents_id} deleted`)
}

module.exports = {
    getTagParents,
    getTagParentsById,
    getTagChildrenById,
    createTagParents,
    deleteTagParents
}