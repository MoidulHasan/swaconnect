/**
 * Title: DB Configaration
 * Descriptions: Database connection and configuration
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const mongoose = require('mongoose');
const dotenv = require("dotenv");


// Configure the environment file
dotenv.config();


// Module Scafolding
const database = {};

// connect to the database
database.url = process.env.DATABASE_URL.replace('myFirstDatabase', process.env.DATABASE_NAME).replace('<password>', process.env.DATABASE_PASSWORD);

database.connect = () => {
    mongoose
        .connect(database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Database Successfully Connected!");
        })
        .catch((err) => {
            console.log("Database Connection Error. Error: ", err);
        });
};


// Exprot Module
module.exports = database;