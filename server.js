const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const DivasController = require('./DivasController')
const PORT = process.env.PORT || 8000

servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get("/", (request, response) => {
    response.send("come bem")
})

servidor.get("/divas", (request, response) => {
    DivasController.getAll()
        .then(divas => response.send(divas))
})

servidor.get("/divas/:id", (request, response) => {
    const id = request.params.id
    DivasController.getById(id)
        .then(usuario => {
            if (!usuario) {
                response.sendStatus(404)
            } else {
                response.send(usuario)
            }
        })
        .catch(error => {
            if (error.name === "CastError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.patch('/divas', (request, response) => {
    const id = request.params.id
    DivasController.update(id, request.body)
        .then(usuario => {
            if (!usuario) { response.sendStatus(404) } else { response.send(usuario) }
        })
        .catch(error => {
            if (error.name === "MongoError" || error.name === "CastError") {
                response.sendStatus(400)
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.post('/divas/cadastro', (request, response) => {
    DivasController.add(request.body)
        .then(usuario => {
            const _id = usuario._id
            response.send(_id)
        })
        .catch(error => {
            if (error.name === "ValidationError") {
                response.sendStatus(400) // bad request
            } else {
                console.log(error)
                response.sendStatus(500)
            }
        })
})

servidor.post('/divas/login', (request, response) => {
    DivasController.login(request.body)
        .then(respostaDoLogin => {
            response.send(respostaDoLogin)
        })
        .catch(error => {
            if (error.name === "ValidationError") {
                console.log(error)
                response.sendStatus(400)
            } else {
                console.log(error)
                response.sendStatus(500)
            }
        })
})

servidor.delete('/divas/:id', (request, response) => {
    DivasController.remove(request.params.id)
        .then(usuario => {
            if (usuario === null || usuario === undefined) { // if(!comida) 
                response.sendStatus(404) // not found
            } else {
                response.sendStatus(204)
            }
        })
        .catch(error => {
            if (error.name === "CastError") {
                response.sendStatus(400) //bad request
            } else {
                response.sendStatus(500)
            }
        })
})

servidor.listen(PORT)
console.info(`rodando na porta ${PORT}`)