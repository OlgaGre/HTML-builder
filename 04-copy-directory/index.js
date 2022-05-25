const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');
const folderPath = __dirname + '/files';
const newFolderPath = __dirname + '/files-copy';




async function copyDir() {
    fs.mkdir(newFolderPath, (err) => {
        if (err) {
            // return console.error(err);
        }
        //    console.log('Directory created successfully!');
    });
    // файлы в папке files
    await deleteFiles()
    await addFiles()



}
async function deleteFiles() {
    fs.readdir(newFolderPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            //    console.log(files)
            // копирование файлов через перебор массива
            for (let i = 0; i < files.length; i++) {

                fs.unlink(newFolderPath + '/' + files[i], (err) => {
                    if (err) throw err;
                    //   console.log('successfully deleted ');
                });

            }

        }
    })
}

function addFiles() {
    fs.readdir(folderPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            //  console.log(files)
            // копирование файлов через перебор массива
            for (let i = 0; i < files.length; i++) {

                fs.copyFile(folderPath + '/' + files[i], newFolderPath + '/' + files[i], err => {
                    if (err) throw err; // не удалось скопировать файл
                    //    console.log('Файл успешно скопирован');
                });

            }

        }
    })

}
copyDir()