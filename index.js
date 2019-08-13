/**
 * VARIABLES
 */

const URL = 'https://zeit.de'
const INTERVAL = 1000; // in ms (1000 = 1s)
const FILENAME = 'log.txt';


/**
 * IMPORTS
 */

const axios = require('axios');
const fs = require('fs');


/**
 * HELPER FUNCTIONS
 */

function log(...args) {
    const timestamp = new Date().toISOString()
    const message = timestamp + '\t' + args.join('\t');
    stream.write(message + '\n');
    console.log(message);
}

function testConnection() {
    axios.get(URL)
        .then(response => {
            if (response.status === 200) {
                log('ON', response.status, response.statusText);
            } else {
                log('OFF', response.status, response.statusText);
            }
        })
        .catch(error => {
            log('ERROR', error.code);
        });
}


/**
 * MAIN
 */

const stream = fs.createWriteStream(FILENAME, { flags:'a' });
setInterval(testConnection, INTERVAL);
