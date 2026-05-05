const http = require('node:http');
const path = require('node:path');


const {foo: helperFoo} = require('./helpers/helper.js');
const readline = require("node:readline");

const foo = async () => {
    // http
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({
    //         data: 'Hello World!',
    //     }));
    // });
    //
    // server.listen(3000);

    // path
    // const pathToFile = __filename;
    // console.log(pathToFile);
    // console.log(path.dirname(pathToFile));
    // console.log(path.extname(pathToFile));
    // console.log(path.basename(pathToFile));
    // console.log(path.parse(pathToFile));
    // console.log(path.isAbsolute(pathToFile));

    // Readline

    const rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rlInstance.question('Name?', (name) => {
        console.log(`Your name is ${name}`);
        process.exit();
    });
}

void foo();


