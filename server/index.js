require('dotenv').config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');

const PORT = 4002;

const {CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('Database is connected');
});
//Where is db defined? I know that app.set() takes in two parameters, and one is db, and .then() takes in db into the callback function - and I know we could call that whatever we want. But where is it referring to the database? Is it because it's massive - and the purpose of massive invoked is to connect the database with the server? So the .then() in this case just knows that whatever element is in that callback function is what we're going to use to refer to the database(just because it's massive)? It's just what massive returns as a promise? Could you use async await here?

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authCtrl.register);

//What do we use for login? I think I saw it as post, which doesn't make sense to me if it's already been created.

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})


