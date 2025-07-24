import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the photos directory path
const photosDir = path.join(__dirname, '../public/photos');
const outputFile = path.join(__dirname, '../public/libraries.json');

// Function to get all image files in a directory
function getImageFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Main function to generate the libraries.json file
function generateLibraries() {
  try {
    // Check if photos directory exists
    if (!fs.existsSync(photosDir)) {
      console.error('Photos directory not found:', photosDir);
      return;
    }

    // Get all subdirectories in the photos directory
    const libraryDirs = fs
      .readdirSync(photosDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Create libraries array - only include directories that exist and contain photos
    const libraries = libraryDirs
      .map((libraryName) => {
        const libraryPath = path.join(photosDir, libraryName);
        const photoFiles = getImageFiles(libraryPath);

        // Only return libraries that exist and have photos
        if (fs.existsSync(libraryPath) && photoFiles.length > 0) {
          return {
            name: libraryName,
            path: `/photos/${libraryName}`,
            photos: photoFiles,
          };
        }
        return null;
      })
      .filter((library) => library !== null); // Remove null entries

    // Write to libraries.json
    fs.writeFileSync(outputFile, JSON.stringify(libraries, null, 2));
    console.log('Successfully generated libraries.json:', outputFile);
  } catch (error) {
    console.error('Error generating libraries.json:', error);
  }
}

// Run the function
generateLibraries();
