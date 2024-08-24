const fs = require('fs');
const path = require('path');

// Configuration
const directoryPath = path.join(__dirname, 'assets'); // Path to your assets folder
const outputPath = path.join(__dirname, 'assets', 'list.json');
const allowedExtensions = ['.png', '.PNG', '.ttf', '.gif', '.css', '.jpg']; // List of file types to include

// Function to get files with allowed extensions
function getFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            files = files.concat(getFiles(itemPath));
        } else {
            const ext = path.extname(item).toLowerCase();
            if (allowedExtensions.includes(ext)) {
                files.push(itemPath.replace(directoryPath + path.sep, '')); // Relative path
            }
        }
    });
    return files;
}

// Generate the list of files
const files = getFiles(directoryPath);

// Write the list to a JSON file
fs.writeFileSync(outputPath, JSON.stringify(files, null, 2), 'utf8');

console.log(`Asset list generated at ${outputPath}`);
