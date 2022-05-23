const fs = require('fs');
const path = require('path');
// let nameHtmlComponents = [];

let pathComponents = __dirname + '/components';
let pathFolderPprojectDist = __dirname + '/project-dist';


// создание папки project-dist
fs.mkdir(pathFolderPprojectDist, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});
// копиравание html файла 
fs.copyFile(__dirname + '/template.html', pathFolderPprojectDist + '/index.html', err => {
    if (err) throw err; // не удалось скопировать файл
    console.log('Файл успешно скопирован');
})

// 



fs.readdir(pathComponents, (err, files) => {
    if (err) {
        console.log(err);
    }

    for (let i = 0; i < files.length; i++) {

        fs.readFile(pathComponents + '/' + files[i], 'utf8', (error, data) => {
            if (err) {
                console.log(err);
            }
            let textReplace = data;
            // console.log(data);
            fs.readFile(pathFolderPprojectDist + '/index.html', 'utf8', (error, data1) => {
                if (err) {
                    return console.log(err);
                }
                console.log(data1);
                let re = new RegExp(`{{${files[i].split('.')[0]}}}`);
                data1 = data1.replace(re, textReplace);

                // fs.writeFile(pathFolderPprojectDist + '/index.html', data1, 'utf8', function(err) {
                //     if (err) { console.log(err) };
                //     console.log(result)
                // });


            });

        });




    }

})









// // Нахождение всех имён тегов в файле шаблона

// fs.readdir(pathComponents, (err, files) => {
//     if (err)
//         console.log(err);
//     else {
//         // console.log(files)
//         // копирование файлов через перебор массива
//         for (let i = 0; i < files.length; i++) {
//             nameHtmlComponents.push(files[i].split('.')[0])
//         }
//         // console.log(nameHtmlComponents);
//         let result = ''
//         fs.readFile(__dirname + '/template.html', 'utf8', (error, data) => {
//             result += data
//         });
//         console.log(result);
//         for (let i = 0; i < nameHtmlComponents.length; i++) {
//             let textToReplace = ''
//             fs.readFile(pathComponents + '/' + nameHtmlComponents[i] + '.html', 'utf8', (error, data) => {
//                 textToReplace += data;
//                 // console.log(textToReplace);
//             });

//         }






//     }
// })



// function replaceHtml() {


//     let result = ''
//     for (let i = 0; i < nameHtmlComponents.length; i++) {
//         let replaceText = ''
//         fs.readFile(pathComponents, 'utf8', (err, data) => replaceText = data)
//         console.log(replaceText);
//         fs.readFile(__dirname + '/template.html', 'utf8', (error, data) => {
//             data.replace(`{{${nameHtmlComponents[i]}}}`, replaceText)
//         })
//     }
//     //   console.log(__dirname + '/template.html');

// }
// replaceHtml()
//     // node 06-build-page