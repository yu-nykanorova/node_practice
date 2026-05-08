const express = require('express');
const fsPromises = require('node:fs/promises');
const path = require('node:path');
const {getData, validateData} = require("./helpers/helpers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pathToFile = path.join(__dirname, 'users.json');

app.get('/users', async (req, res) => {
    try {
        const users = await getData(pathToFile);

        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const validationResult = validateData(name, email, password);

        if (validationResult) {
            return res.status(400).send(validationResult);
        }

        const users = await getData(pathToFile);

        if (users.find((user) => user.email === email)) {
            return res.status(409).send("This email is already in use.");
        }

        const id = users[users.length - 1].id + 1
        const newUser = {id, name, email, password};
        users.push(newUser);

        await fsPromises.writeFile(pathToFile, JSON.stringify(users), 'utf8');

        res.status(201).send(newUser);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (Number.isNaN(userId)) {
            return res.status(400).send("User must be an integer");
        }

        const users = await getData(pathToFile);

        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (Number.isNaN(userId)) {
            return res.status(400).send("User must be an integer");
        }

        const users = await getData(pathToFile);

        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send("User not found");
        }
        const {name, email, password} = req.body;

        const validationResult = validateData(name, email, password);

        if (validationResult) {
            return res.status(400).send(validationResult);
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;

        await fsPromises.writeFile(pathToFile, JSON.stringify(users), 'utf8');

        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (Number.isNaN(userId)) {
            return res.status(400).send("User must be an integer");
        }

        const users = await getData(pathToFile);

        const  userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('No such user');
        }
        users.splice(userIndex, 1);

        await fsPromises.writeFile(pathToFile, JSON.stringify(users), 'utf8');

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

