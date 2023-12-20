require('dotenv').config()

const { Client } = require('pg')
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
})

const express = require('express')
const app = express()
const port = 5000

app.get('/api/products', async (req, res) => {
    const pgRes = await client.query('SELECT * FROM products')
    res.send(pgRes.rows)
    res.status(200)
})

app.post('/api/products/add', async (req, res) => {
    console.log(res)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    client.connect(async function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
})



