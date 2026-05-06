const {foo: helperFoo} = require('./helpers/helper.js');

const http = require('node:http');
const path = require('node:path');
const readline = require("node:readline/promises");
const fs = require('node:fs'); // з callback
const fsPromises = require('node:fs/promises');
const EventEmitter = require('node:events');
const os = require('node:os');

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
    // const rlInstance = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    // })
    // const name = await rlInstance.question('Name?');
    // console.log(`Your name is ${name}`);
    // process.exit(0);

    // FS, приклад з callback
    // fs.mkdir('./test', () => {});

    // FS - призначений для взаємодії з файловою системою
    // const pathToFile = path.join(__dirname, 'test.txt');
    // await fsPromises.writeFile(pathToFile, 'Hello World!\n');
    // const data = await fsPromises.readFile(pathToFile, 'utf8');
    // console.log(data);
    // await fsPromises.appendFile(pathToFile, 'Some new data');
    // await fsPromises.mkdir(path.join(__dirname, 'new-folder'), {recursive: true});
    // await fsPromises.mkdir(path.join(__dirname, 'new-folder', 'another-folder'), {recursive: true});
    // await fsPromises.rm(path.join(__dirname, 'new-folder'), {recursive: true});

    // await fsPromises.unlink(pathToFile); // delete file
    // await fsPromises.rename(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt')); // перейменування та перенесення до папки new-folder
    // await fsPromises.copyFile(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt')); // перейменування та копіювання до папки new-folder
    // const stat = await fsPromises.stat(pathToFile);
    // console.log(stat);
    // console.log(stat.isDirectory()); // перевірка, чи є те, що у stat директорією
    // console.log(stat.isFile()); // перевірка, чи є те, що у stat файлом

    // Streams
    // const pathToFile = path.join(__dirname, '25900.pdf');
    // const readStream = fs.createReadStream(pathToFile);
    // const writeStream = fs.createWriteStream(path.join(__dirname, 'new-bid-file.pdf')); // дає можливість опрацювання інформації малими порціями
    // readStream.on('data', (chunk) => {
    //     console.log('chunk', chunk.length);
    //     writeStream.write(chunk);
    // }) // аналогічна дія через pipe
    // readStream.pipe(writeStream);

    // Events, емітити подію можна з різних місць проєкту
    // const emitter = new EventEmitter();
    // emitter.on('event', (...args) => {
    //     args.length === 0
    //         ? console.log('No args yet')
    //         : console.log(args);
    //     console.log('Event 1 happened');
    // }); // обробник, 'event' - ключ, що може мати будь-яку назву. Як названий, так і слід викликати у emit
    // emitter.once('event', () => {
    //     console.log('Event 2 happened');
    // }); // once замість on - відпрацює раз
    // emitter.emit('event'); // можна викликати кілька разів - стільки ж раз відпрацює; тільки ключ визначає, скільки разів буде працювати обробник
    // emitter.emit('event', 'Hello', 345);

    // OS
    console.log(os.arch());
    console.log(os.cpus());
    console.log(os.totalmem() / 1024 / 1024/ 1024, 'gb');
    console.log(os.freemem() / 1024 / 1024/ 1024, 'gb');
    console.log(os.homedir());
    console.log(os.hostname());
    console.log(os.platform());
    console.log(os.userInfo());
}

void foo();


