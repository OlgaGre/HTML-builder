const fs = require('fs');
const path = require('path');
let nameHtmlComponents = [];
// console.log(__dirname + '/template.html')
let pathComponents = __dirname + '/components';
let pathFolderPprojectDist = __dirname + '/project-dist';
// console.log(pathFolderPprojectDist)
// console.log(pathComponents);




//Нахождение всех имён тегов в файле шаблона

fs.readdir(pathComponents, (err, files) => {
    if (err)
        console.log(err);
    else {
        // console.log(files)
        // копирование файлов через перебор массива
        for (let i = 0; i < files.length; i++) {
            nameHtmlComponents.push(files[i].split('.')[0])
        }
        console.log(nameHtmlComponents);

    }
})



function replaceHtml() {


    let result = ''
    for (let i = 0; i < nameHtmlComponents.length; i++) {
        let replaceText = ''
        fs.readFile(pathComponents, 'utf8', (err, data) => replaceText = data)
        console.log(replaceText);
        fs.readFile(__dirname + '/template.html', 'utf8', (error, data) => {
            data.replace(`{{${nameHtmlComponents[i]}}}`, replaceText)
        })
    }
    //   console.log(__dirname + '/template.html');

}
replaceHtml()