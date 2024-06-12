const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'output', 'output.txt');
const outputFilePath = path.join(__dirname, 'output', 'processed_output.json');

const processFile = () => {
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const objects = data.split(',')
            .map(item => item.trim()) // Removes spaces from any string
            .filter(item => item)
            .map(value => {
                let type;
                if (/^\d+$/.test(value)) {
                    type = 'Integer';
                } else if (/^\d+\.\d+$/.test(value)) {
                    type = 'Real Number';
                } else if (/\d/.test(value)) {
                    type = 'Alphanumeric';
                } else {
                    type = 'Alphabetical String';
                }
                return { value, type };
            });

        fs.writeFile(outputFilePath, JSON.stringify(objects, null, 2), err => {
            if (err) throw err;
            console.log('Finished writing processed_output.json');
        });
    });
};

processFile();
