const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
require('dotenv').config();
const booksRouter = require('./src/routes/booksRouter');



const app = express();
const port = process.env.PORT_BACKEND

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(201).send({message: "Get / je funkcne."});
});

app.use('/api/books', booksRouter);

app.get('*', (req, res) => {
    res.status(404).send({message: `Stranka ${req.originalUrl} neexistuje`});
})
app.listen(port, () => {
    console.log(`My Book management application listen on port: ${port}`);
});