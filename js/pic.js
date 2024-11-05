const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directoryPath = 'C:\\Users\\Mahi\\Desktop\\codechef\\CC-Website-5.O\\img'; // Update this to your 'img' folder path
const outputDir = path.join(directoryPath, 'converted');

// Create output directory if it doesn’t exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Recursive function to process files in all subdirectories
function processImagesInDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) return console.error('Error reading directory:', err);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            
            // Check if the item is a directory
            fs.stat(filePath, (err, stats) => {
                if (err) return console.error('Error reading file stats:', err);
                if (stats.isDirectory()) {
                    // Recursively process the subdirectory
                    processImagesInDirectory(filePath);
                } else {
                    // Process only .png and .jpg files
                    const ext = path.extname(file).toLowerCase();
                    if (ext === '.png' || ext === '.jpg') {
                        const outputFilePath = path.join(outputDir, `${path.parse(filePath).name}.webp`);

                        
                        sharp(filePath)
                            .toFormat('webp')
                            .toFile(outputFilePath, (err) => {
                                if (err) return console.error('Error converting image:', err);
                                console.log(`Converted ${filePath} to ${outputFilePath}`);

                            });
                    }
                }
            });
        });
    });
}

// Start processing from the root directory
processImagesInDirectory(directoryPath);