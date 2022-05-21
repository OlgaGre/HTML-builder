const fs = require('fs');
const path = require('path');
let arrCss = [];
let pathDundle = __dirname + '/project-dist/bundle.css'
console.log(pathDundle)

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
            console.log(files)
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.')[1] == 'css') {
                    arrCss.push(files[i])
                    readFile(files[i])
                }
            }
        }
        console.log(arrCss)
    }) ///.(?=\.)/g   node 05-merge-styles  05-merge-styles\project-dist\index.html
function readFile(file) {
    fs.readFile(__dirname + '/styles/' + file, 'utf8', (error, data) => {
        // console.log(data)
        writeFile(data)
    });
}

function writeFile(text) {
    fs.appendFile(pathDundle, text, function(error) {
        if (error) throw error; // если возникла ошибка
    })
}