const { log } = require('console');
const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');
// let nameHtmlComponents = [];

let pathComponents = __dirname + '/components';
let pathFolderPprojectDist = __dirname + '/project-dist';
let pathCSS = __dirname + '/project-dist/style.css';
let pathOldAssetsFolder = __dirname + '/assets'



// создание папки project-dist
function createFolder() {
    fs.mkdir(pathFolderPprojectDist, (err) => {
        if (err) {
            return console.error(err);
        }
        //  console.log('Directory created successfully!');
    });
}
//
// копиравание html файла 
async function copeHtml() {
    return fsPromises.copyFile(__dirname + '/template.html', pathFolderPprojectDist + '/index.html')
}


// 
// просмотр папки components и нахождение в ней файлов.
async function findComponentsFiles() {
    let files = await fsPromises.readdir(pathComponents, (err, files) => {
            if (err) {
                console.log(err);
            }
        })
        // console.log(files);
    for (let i = 0; i < files.length; i++) {
        //  await changeHTMLFiles()
        //  await saveConteined(files[i])
        await changeHTMLFiles(files[i])


    }



}
//
// имя файла без разрешения файлов
async function cutArr(nameOfFile) {

    return nameOfFile.split('.')[0]


}
//
// сохранение содержимого в переменную
async function saveConteined(nameOfFile) {
    let savedContantInFileComponents = await fsPromises.readFile(pathComponents + '/' + nameOfFile, 'utf8');
    // console.log(savedContantInFileComponents);
    return savedContantInFileComponents

    // await changeHTMLFiles(saveConteined, nameOfFile)



}
//
// смена {{...}} на содержание переменной
async function changeHTMLFiles(nameOfFile) {
    let CutName = await cutArr(nameOfFile)
    let SaveConteined = await saveConteined(nameOfFile)
    let HTMLinProject = await readingChangeFile()

    //  console.log(CutName, SaveConteined);
    let re = new RegExp(`{{${CutName}}}`);

    result = HTMLinProject.replace(re, SaveConteined);
    fsPromises.writeFile(pathFolderPprojectDist + '/index.html', result)


}
//
// чтение файла, который будет меняться
async function readingChangeFile() {
    return fsPromises.readFile(pathFolderPprojectDist + '/index.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
    });
}

function createCss() {
    // fs.unlink(pathCSS, (err) => {
    //     if (err) throw err;
    //     //   console.log('successfully deleted ');
    // });
    // поиск файлов css
    fs.readdir(__dirname + '/styles', (err, files) => {
        if (err)
            console.log(err);
        else {
            // console.log(files)
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.')[1] == 'css') {

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
        fs.appendFile(pathCSS, text, function(error) {
            if (error) throw error; // если возникла ошибка
        })
    }
}

function createAssets() {
    fs.mkdir(pathFolderPprojectDist + '/assets', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}
async function readingOldAssetsFolder(path) {
    fs.readdir(pathOldAssetsFolder, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err)
        }
        //  console.log(files)
        // console.log(files)
        for (const file of files) {
            if (file.isDirectory()) {

                fs.mkdir(pathFolderPprojectDist + '/assets/' + file.name, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                })
                fs.readdir(pathOldAssetsFolder + '/' + file.name, { withFileTypes: true }, (err, filesInFolder) => {
                    if (err) {
                        console.log(err)
                    }
                    //   console.log(filesInFolder)
                    filesInFolder.forEach((el) => {
                        fs.copyFile(pathOldAssetsFolder + '/' + file.name + '/' + el.name, pathFolderPprojectDist + '/assets/' + file.name + '/' + el.name, (err) => {
                            if (err) {
                                return console.error(err);
                            }
                        })
                    })


                })


            }
        }

    })
}
// fs.readdir()
async function copyDir() {
    await createAssets();
    await readingOldAssetsFolder();







}


(async() => {
    await createFolder()
    await copeHtml()
    await findComponentsFiles()
    createCss()
    await copyDir()
})();






//     // node 06-build-page