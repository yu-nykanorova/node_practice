const fsPromises = require('node:fs/promises');

const getData = async (path) => {
    const data = await fsPromises.readFile(path, 'utf8');
    return JSON.parse(data);
};

const validateData = (name, email, password) => {
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!name || name.length < 3 || name.length > 20) {
        return "User name should be 3-20 characters";
    }

    if (!email || !email.includes('@')) {
        return "Email is invalid";
    }

    if (!password || password.length < 6) {
        return "Password must be at least 6 characters, contain letters and numbers";
    }

    return null;
}

module.exports = {getData, validateData};