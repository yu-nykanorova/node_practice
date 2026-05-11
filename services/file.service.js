const fsPromises = require('node:fs/promises');
const path = require('node:path');

const pathToFile = path.join(__dirname, '..', 'users.json');

const readData = async () => {
    const data = await fsPromises.readFile(pathToFile, 'utf8');
    return JSON.parse(data);
};

const writeData = async (data) => {
    await fsPromises.writeFile(pathToFile, JSON.stringify(data), 'utf8');
};

module.exports = {readData, writeData};