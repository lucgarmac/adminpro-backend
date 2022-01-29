const express = require('express');
const cors = require('cors');
const path = require('path');
const { connection } = require('./db/config');
require('dotenv').config();

// Create server express
const app = express();

/*******************
 * INIT MIDDLEWARES*
 *******************/

// Config CORS
app.use(cors());

// Body parser
app.use(express.json());

// public directory
app.use(express.static('public'));

/*******************
 * END MIDDLEWARES*
 *******************/

// DB connection
connection();


// Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/doctors', require('./routes/doctors.routes'));
app.use('/api/search', require('./routes/searchs.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));
app.use('/api/login', require('./routes/auth.routes'));

// Redirect to index when refresh page
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})


// Launch server
const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server listen in port ' + port);
});