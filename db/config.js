const mongoose = require('mongoose');


const connection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('DB Online');
    } catch (error) {
        console.error('An error has ocurred when connect to db.', error);
        throw new Error('An error has ocurred when connect to db.', error);
    }
};

module.exports = {
    connection
};