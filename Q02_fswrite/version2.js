// Problem 2: File Writer
// Problem Statement: Create a function writeToFile(filePath, content) that takes the path to a file and user input content as input. The function should write the content to the specified file using the fs module.

// Function Signature:

// function writeToFile(filePath, content) {
//     // Implementation
// }
// Expected Output:

// Data written to output.txt
// Test Cases:

// writeToFile('test-files/output1.txt', 'Sample content.');
// // Expected Output: Data written to output1.txt

// writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// // Expected Output: Error writing to file: ENOENT: no such file or directory...



// solution:-

const fs = require('fs');
const path = require('path');

function createDirectoryIfNotExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

function writeToFile(filePath, content) {
    const directory = path.dirname(filePath);
    createDirectoryIfNotExists(directory);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}

// Test Cases
writeToFile('Q2_fswrite/output1.txt', 'Sample content.');
writeToFile('Q2_fswrite/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
