/**
 * Title: Environment
 * Descriptions: This moodule provide environment related data
 * Author: Modidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
require('dotenv').config();

// Module Scafoldings
const environment = {};


// environment for development
environment.development = {
    port: 3939,
    envName: "development",
    appRoot: process.env.APPROOT,
}

// environment for production
environment.production = {
    port: 5454,
    envName: "production",
    appRoot: process.env.APPROOT,
}

// determine current envirenmet 
const currentEnvironment = typeof(process.env.ENV) === "string" ? process.env.ENV : "production";

// determine the environment to export
const environmentToExport = typeof(environment[currentEnvironment]) === "object" ? environment[currentEnvironment] : environment.development;

// export environment object
module.exports = environmentToExport;