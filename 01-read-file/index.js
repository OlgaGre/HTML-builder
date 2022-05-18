const fs = require('node:fs');
let path = require('path');
let dirPath = path.join(__dirname, '/text.txt');
fs.readFile(dirPath, 'utf8', (error, data) => {
    console.log(data)
});