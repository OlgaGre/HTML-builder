const fs = require('fs');
const path = __dirname + '/secret-folder'
    // Function to get current filenames
    // in directory
fs.readdir(path, (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log(files)
            for (let i = 0; i < files.length; i++) {
                let result = '';
                result += files[i].split('.')[0] + ' - '
                result += files[i].split('.')[1] + ' - '
                fs.stat(path + '/' + files[i], (err, stats) => {
                        if (err) throw err;
                        if (stats.isFile()) {
                            result += stats.size


                            console.log(result)
                        }
                    }

                )

            }
        }
    }) ///.(?=\.)/g