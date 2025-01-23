const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;
const https = require('https')
const fs = require('fs')
require('dotenv').config();
const booksRouter = require('./src/routes/booksRouter');



const app = express();
const port = process.env.PORT_BACKEND
const secureOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/dodko.site/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/dodko.site/fullchain.pem')
}

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
https.createServer(secureOptions, app).listen(port, () => {
    console.log(`My Book management application is running on https://dodko.site:${port}`);
});
/*app.listen(secureOptions,port, () => {
    console.log(`My Book management application listen on port: ${port}`);
});*/