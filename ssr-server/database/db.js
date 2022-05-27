const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const clientDB = mongoose
    .connect(process.env.DB_CONNECTION)
    .then(db => {
        console.log('DB Connected')
        return db.connection.getClient();
    })
    .catch(error => console.log('Error ' + error));

module.exports = clientDB;
