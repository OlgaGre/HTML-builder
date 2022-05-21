const fs = require('fs');
const path = require('path');
let arrCss = [];
let pathDundle = __dirname + '/project-dist/bundle.css'


// очистка doudle.css
fs.unlink(pathDundle, (err) => {
    // if (err) throw err;
    //   console.log('successfully deleted ');
});
// поиск файлов css
fs.readdir(__dirname + '/styles', (err, files) => {
    if (err)
        console.log(err);
    else {

        for (let i = 0; i < files.length; i++) {
            if (files[i].split('.')[1] == 'css') {
                arrCss.push(files[i])
                readFile(files[i])
            }
        }
    }

})

function readFile(file) {
    fs.readFile(__dirname + '/styles/' + file, 'utf8', (error, data) => {

        writeFile(data)
    });
}

function writeFile(text) {
    fs.appendFile(pathDundle, text, function(error) {
        if (error) throw error; // если возникла ошибка
    })
}