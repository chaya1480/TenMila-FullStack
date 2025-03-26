const fs = require('fs');

function readTextFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    } catch (error) {
        console.error('Error reading the file:', error);
        throw new Error('Failed to read the text file');
    }
}

module.exports = { readTextFile };
