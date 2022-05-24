const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');
// let nameHtmlComponents = [];

let pathComponents = __dirname + '/components';
let pathFolderPprojectDist = __dirname + '/project-dist';




// создание папки project-dist
function createFolder() {
    fs.mkdir(pathFolderPprojectDist, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
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
            } else {
                console.log(files)
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

    console.log(CutName, SaveConteined);
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
        } else {
            console.log(data);
        }
    });
}
(async() => {
    await createFolder()
    await copeHtml()
    await findComponentsFiles()
})();






//     // node 06-build-page