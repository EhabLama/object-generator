const fs = require("fs");
const path = require("path");
const readline = require("readline");

const inputFilePath = path.join(__dirname, "output", "output.txt");
const outputFilePath = path.join(__dirname, "output", "processed_output.json");

const processFile = () => {
  const readStream = fs.createReadStream(inputFilePath, "utf8");
  const writeStream = fs.createWriteStream(outputFilePath);
  const rl = readline.createInterface({
    input: readStream,
    terminal: false,
  });

  const objects = [];

  rl.on("line", (line) => { // read the output.txt file line by line
    const items = line
      .split(",")
      .map((item) => item.trim()) // Removes spaces from strings
      .filter((item) => item); // Removes any empty strings
    items.forEach((value) => {
      let type;
      if (/^\d+$/.test(value)) {
        type = "Integer";
      } else if (/^\d+\.\d+$/.test(value)) {
        type = "Real Number";
      } else if (/\d/.test(value)) {
        type = "Alphanumeric";
      } else {
        type = "Alphabetical String";
      }
      objects.push({ value, type });
    });
  });

  rl.on("close", () => {
    writeStream.write(JSON.stringify(objects, null, 2));
    writeStream.end();
    console.log("Finished writing processed_output.json");
  });
};

processFile();
