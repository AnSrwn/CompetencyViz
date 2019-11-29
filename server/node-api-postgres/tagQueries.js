
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
    const { id, deleteChildren } = request.body

    if (deleteChildren == 'true') {
        var deletedTags = new Set()

        deleteTagAndChildren(id)
            .then(function (result) {

                console.log(result)
                deletedTags = result

                deletedTags.forEach(function (deletedTag) {
                    Console.log(deletedTag)

                })


                if (deletedTags.size > 0) {

                    var resultsString = '{"deletedTags":['

                    deletedTags.forEach(function (deletedTag) {
                        resultsString.concat(' { "id": "' + deletedTag + '" }, ')

                    })

                    resultsString = resultsString.slice(0, -2)
                    resultsString.concat(']}')

                    response.status(200).json(JSON.parse(resultsString))
                } else {
                    response.status(500).send(`Tag ${id} and its children could not be deleted.`)
                }
            })



    } else {
        if (deleteTagAndReconnectChildren(id)) {
            var resultsString = '{"deletedTags":[{"id":"' + id + '"}]}'

            response.status(200).json(JSON.parse(resultsString))
        } else {
            response.status(500).send(`Tag ${id} could not be deleted.`)
        }
    }
}

async function deleteTagAndChildren(id) {
    var deletedTags = new Set()

    pool.query('SELECT * FROM tag_parents WHERE parents_id = $1', [id], (error, results) => {
        if (error) {
            return deletedTags
        }

        var childrenString = JSON.stringify(results.rows)
        var childrenArray = JSON.parse(childrenString)

        async function goThroughChildren(childrenArray) {
            for (child of childrenArray) {
                deleteTagAndChildren(child['tag_id'])
                    .then(function (result) {
                        console.log('ids: ' + result)
                        deletedTags = new Set([...deletedTags, ...result])
                        console.log('tada: ' + deletedTags)
                    }
                )
            }
        }

        goThroughChildren(childrenArray)
            .then(
                //delete all connections to and from this tag
                pool.query('DELETE FROM tag_parents WHERE tag_id = $1 OR parents_id = $1',
                    [id], (error, results) => {
                        if (error) {
                            return deletedTags
                        }

                        //delete the tag
                        pool.query('DELETE FROM tag WHERE id = $1',
                            [id], (error, results) => {
                                if (error) {
                                    return deletedTags
                                }
                                deletedTags.add(id)
                                console.log(deletedTags)
                                return deletedTags
                            })
                    }
                )
            )
    }
    )
};

function deleteTagAndReconnectChildren(id) {
    pool.query('SELECT * FROM tag_parents WHERE tag_id = $1', [id], (error, results) => {
        if (error) {
            return false
        }

        var parentsString = JSON.stringify(results.rows)
        var parentsArray = JSON.parse(parentsString)

        pool.query('SELECT * FROM tag_parents WHERE parents_id = $1', [id], (error, results) => {
            if (error) {
                return false
            }
            var childrenString = JSON.stringify(results.rows)
            var childrenArray = JSON.parse(childrenString)

            //create new relations between children of tag and parents of tag
            for (parent of parentsArray) {
                for (child of childrenArray) {
                    pool.query('INSERT INTO tag_parents (tag_id, parents_id) VALUES($1, $2)',
                        [child["tag_id"], parent["parents_id"]], (error, results) => {
                            if (error) {
                                return false
                            }
                        })
                }
            }

            //delete all connections to and from this tag
            pool.query('DELETE FROM tag_parents WHERE tag_id = $1 OR parents_id = $1',
                [id], (error, results) => {
                    if (error) {
                        return false
                    }

                    //delete the tag
                    pool.query('DELETE FROM tag WHERE id = $1',
                        [id], (error, results) => {
                            if (error) {
                                return false
                            }
                        })
                })
        })
    })
    return true
};

module.exports = {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
}