const express = require('express')

const init = (connection) => {
    const lojasController = require('../controllers/lojas')(connection)
    const router = express.Router()

    router.get('/', lojasController.index)

    return router
}

module.exports = init