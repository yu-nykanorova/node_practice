const foo = () => {
    console.log(22222);

    console.log(__dirname); // вказує на директорію, в якій працюємо з файлом
    console.log(__filename); // вказує на файл, з яким працюємо
    console.log(process.cwd()); // місце, звідки робиться запуск індексу
}

module.exports = {
    foo
}

