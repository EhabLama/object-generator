const fs = require('fs');
const path = require('path');

const fileSize = 10 * 1024 * 1024; // 10MB
const maxAlnumSpace = 10;
const outputFilePath = path.join(__dirname, 'output', 'output.txt');

fs.mkdirSync(path.join(__dirname, 'output'), { recursive: true });

const randomString = length => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
};

const randomAlphanumeric = length => {
    const alnum = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += alnum.charAt(Math.floor(Math.random() * alnum.length));
    }
    const spacesBefore = ' '.repeat(Math.floor(Math.random() * maxAlnumSpace));
    const spacesAfter = ' '.repeat(Math.floor(Math.random() * maxAlnumSpace));
    return `${spacesBefore}${result}${spacesAfter}`; // Set a random number of spaces before and after the alphanumeric string
};

const generateData = () => {
    const stream = fs.createWriteStream(outputFilePath);
    let fileSizeCounter = 0;

    while (fileSizeCounter < fileSize) {
        let obj;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                obj = randomString(Math.floor(Math.random() * 20) + 1); // Alphabetical string
                break;
            case 1:
                obj = (Math.random() * 100000).toFixed(6); // Real number
                break;
            case 2:
                obj = Math.floor(Math.random() * 100000).toString(); // Integer
                break;
            case 3:
                obj = randomAlphanumeric(Math.floor(Math.random() * 20) + 1); // Alphanumeric
                break;
        }
        if (fileSizeCounter + obj.length + 1 > fileSize) break;
        fileSizeCounter += obj.length + 1;
        stream.write(obj + ',');
    }
    stream.end();
};

generateData();
