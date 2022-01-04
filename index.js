const express = require('express');
const cors = require('cors');
const { connection } = require('./db/config');
require('dotenv').config();

// Create server express
const app = express();

// Config CORS
app.use(cors());

// DB connection
connection();

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello world'
    });
});


// Launch server
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server listen in port ' + port);
});