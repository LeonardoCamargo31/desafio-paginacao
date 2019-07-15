const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

//passamos um obj de configuração ao knex
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'den1.mysql3.gear.host',
        port: '3306',
        user: 'desafiopaginacao',
        password:  'Cn2SEk-16LF_',
        database: 'desafiopaginacao'
    }
})

app.use(bodyParser.urlencoded({ extended: false }))
//os arquivos estáticos
app.use(express.static('public'))
//setando o ejs como minha view engine, as minhas views estão em /views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const route = require('./routes/lojas')
app.use('/',route(knex))

app.listen(port,()=>{
    console.log('Servidor rodando...')
})