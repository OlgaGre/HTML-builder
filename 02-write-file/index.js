const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
let path = require('path');
let dirPath = path.join(__dirname, '/text.txt');
process.stdout.write('enter your text: ')

process.stdin.on('data', data => {
    if (data.toString().trim() == 'exit') {
        process.stdout.write('Good bye!')
        process.exit()
    } else {
        fs.appendFile(dirPath, data, function(error) {
            if (error) throw error; // если возникла ошибка
        })
    }

});
// process.on('exit', () => {
//     console.log(`About to exit with code`);
// });

process.on('SIGINT', function() {
    process.stdout.write('Good bye!')
    process.exit()
});
//           exit