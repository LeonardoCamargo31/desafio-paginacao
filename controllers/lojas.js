const init = (connection) => {
    const Lojas = require('../models/lojas')(connection)

    const index = async (req, res) => {
        const params = {
            pageSize: req.query.pageSize || 20,
            currentPage: req.query.page || 0
        }
    
        const results = await Lojas.findAll(params)
        res.render('index', { results })
    }

    return {
        index
    }
}

module.exports = init