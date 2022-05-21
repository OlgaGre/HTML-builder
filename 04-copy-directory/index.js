const fs = require('fs');
const path = require('path');
const folderPath = __dirname + '/files';
const newFolderPath = __dirname + '/files-copy';

function copyDir() {


    // fs.remove(newFolderPath, (err) => {

    //     if (err) {
    //         return console.log("error occurred in deleting directory", err);
    //     }

    //     console.log("Directory deleted successfully");
    // });


    fs.mkdir(newFolderPath, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
    // файлы в папке files
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