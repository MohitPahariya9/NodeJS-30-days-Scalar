// Problem 3: Execute Command
// Problem Statement: Create a function executeCommand(command) that takes a shell command as input and executes it using the child_process module. The function should print the output of the command to the console.

// Function Signature:

// function executeCommand(command) {
//     // Implementation
// }
// Expected Output:

// Command Output:
// File1.txt
// File2.txt
// Test Cases:

// executeCommand('ls -la');
// // Expected Output: (output of ls -la)

// executeCommand('echo "Hello, Node.js!"');
// // Expected Output: Hello, Node.js!

// solution:-


const { exec } = require('child_process');
function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Command Output:\n${stdout}`);
    });
}
// Test Cases:

// executeCommand('ls -la');
executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');
