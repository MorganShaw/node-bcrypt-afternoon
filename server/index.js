require('dotenv').config()
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const PORT = 4002;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})


// app.set('db', db)