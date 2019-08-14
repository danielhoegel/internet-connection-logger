/**
 * VARIABLES
 */

const URL = 'https://zeit.de';
const INTERVAL = 5000; // in ms (1000 = 1s)


/**
 * IMPORTS
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');


/**
 * HELPER FUNCTIONS
 */

function getLocaleISOTime() {
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localeISOTime = (new Date(Date.now() - timezoneOffset)).toISOString().slice(0, -1);
    return localeISOTime.replace('T', ' ');
}

function getLocaleTimestamp() {
    const localeISOTime = getLocaleISOTime();
    return localeISOTime
        .replace(/:/g, '-')
        .replace('.', '-')
        .replace(' ', '_');
}

function log(...args) {
    const timestamp = getLocaleISOTime();
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

const fileName = `log_${getLocaleTimestamp()}.txt`;
const fileDir = 'logs';

if (!fs.existsSync(fileDir)){
    fs.mkdirSync(fileDir);
}
const filePath = path.join(fileDir, fileName);
const stream = fs.createWriteStream(filePath, { flags:'a' });
console.log(`Logging to file ${filePath}`);

setInterval(testConnection, INTERVAL);
