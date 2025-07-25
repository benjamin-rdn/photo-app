import { exiftool } from 'exiftool-vendored';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the photos directory path
const photosDir = path.join(__dirname, '../public/photos');
const outputFile = path.join(__dirname, '../public/libraries.json');

// Async function to get all image files in a directory with Keywords from metadata
async function getImageFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    const photoObjs = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        try {
          const metadata = await exiftool.read(filePath);
          // Keywords can be a string or array, normalize to array
          let keywords = metadata.Keywords || metadata.Subject || [];
          if (typeof keywords === 'string') keywords = [keywords];
          if (!Array.isArray(keywords)) keywords = [];
          // Ensure all keywords are strings
          keywords = keywords.map((kw) => String(kw));
          // Compute relative path from public directory
          const publicDir = path.resolve(__dirname, '../public');
          const relativePath = path.relative(publicDir, filePath).split(path.sep).join('/');
          // Only include selected metadata fields, all as strings
          const selectedMetadata = {
            exposureTime: metadata.ExposureTime !== undefined ? String(metadata.ExposureTime) : undefined,
            fNumber: metadata.FNumber !== undefined ? String(metadata.FNumber) : undefined,
            iso: metadata.ISO !== undefined ? String(metadata.ISO) : undefined,
            focalLength: metadata.FocalLength !== undefined ? String(metadata.FocalLength) : undefined,
          };
          // Remove undefined values from selectedMetadata
          Object.keys(selectedMetadata).forEach((key) => {
            if (selectedMetadata[key] === undefined) {
              delete selectedMetadata[key];
            }
          });
          return {
            filename: file,
            keywords: keywords,
            relativePath: `/${relativePath}`,
            metadata: selectedMetadata,
          };
        } catch {
          // Compute relative path from public directory
          const publicDir = path.resolve(__dirname, '../public');
          const relativePath = path.relative(publicDir, filePath).split(path.sep).join('/');
          return {
            filename: file,
            keywords: [],
            relativePath: `/${relativePath}`,
            metadata: {},
          };
        }
      }),
    );
    return photoObjs;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Main function to generate the libraries.json file
async function generateLibraries() {
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
    const libraries = [];
    for (const libraryName of libraryDirs) {
      const libraryPath = path.join(photosDir, libraryName);
      const photoFiles = await getImageFiles(libraryPath);
      if (fs.existsSync(libraryPath) && photoFiles.length > 0) {
        libraries.push({
          name: libraryName,
          path: `/photos/${libraryName}`,
          photos: photoFiles,
        });
      }
    }

    // Write to libraries.json
    fs.writeFileSync(outputFile, JSON.stringify(libraries, null, 2));
    console.log('Successfully generated libraries.json:', outputFile);
  } catch (error) {
    console.error('Error generating libraries.json:', error);
  } finally {
    await exiftool.end();
  }
}

// Run the function
generateLibraries();
