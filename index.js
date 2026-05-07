const path = require('node:path');
const fsPromises = require('node:fs/promises');

const foo = async () => {
    const pathToBaseFolder = path.join(__dirname, "baseFolder");
    await fsPromises.mkdir(pathToBaseFolder, {recursive: true});

    for (let i = 0; i < 5; i++) {
        const pathToFolder = path.join(pathToBaseFolder, `folder${i+1}`);
        await fsPromises.mkdir(pathToFolder, {recursive: true});

        const folderStat = await fsPromises.stat(pathToFolder);

        console.log(`Folder ${i+1} path: ${pathToFolder}`);
        console.log(`- Is this a folder? ${folderStat.isDirectory() ? 'Yes' : 'No'}`);

        for (let j = 0; j < 5; j++) {
            const pathToFile = path.join(pathToFolder, `file${j+1}.txt`);
            await fsPromises.writeFile(pathToFile, `Welcome to text file N${j+1} in folder N${i+1}`, 'utf-8');

            const fileStat = await fsPromises.stat(pathToFile);

            console.log(`-- Path to file ${j+1}: ${pathToFile}`);
            console.log(`-- Is this a file? ${fileStat.isFile() ? 'Yes' : 'No'}`);
        }
    }
}

void foo();


