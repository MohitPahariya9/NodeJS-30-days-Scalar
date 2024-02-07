// write a function in nodejs to  Create a function readFileContent(filePath) that takes the path to a file as input and reads its content asynchronously using the fs module. The function should print the content to the console. 

// Function Signature:

// function readFileContent(filePath) {
//     // Implementation
// }   

// Expected Output:

// File Content:
// This is the content of the file.
// Hello, Node.js!
// Test Cases:

// readFileContent('test-files/file1.txt');
// // Expected Output: Content of file1.txt

// readFileContent('test-files/empty-file.txt');
// // Expected Output: (empty string)

// readFileContent('test-files/nonexistent-file.txt');
// // Expected Output: Error reading file: ENOENT: no such file or directory...


// solution:-

const fs = require('fs').promises;
const path = require('path');

async function readFileContent(filePath) {
    try {
        const absolutePath = path.join(__dirname, filePath);
        const data = await fs.readFile(absolutePath, 'utf8');
        console.log(`File Content:\n${data}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Error reading file: ${err.code}: ${err.message}`);
        } else {
            throw err;
        }
    }
}

// Test Cases:
async function testReadFileContent() {
    await readFileContent('test-files/file1.txt');
    await readFileContent('test-files/empty-file.txt');
    await readFileContent('test-files/nonexistent-file.txt');
}

testReadFileContent();








// OUTPUT:-
// File Content:
// This is the content of the file.
// Hello, Node.js!
// File Content:

// Error reading file: ENOENT: ENOENT: no such file or directory, open 'D:\aaWEb_D\NodeJS 30 days\Q1_fsread\test-files\nonexistent-file.txt'
