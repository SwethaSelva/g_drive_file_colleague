const fs = require('fs');
const path = require('path');

/**
 * Remove the zip extension from the file name
 * @param {String} fileName 
 * @returns filename with '.zip'
 */
function removeExt(fileName) {
  if (!fileName.endsWith('.zip')) return fileName;

  return fileName.split('.').slice(0, -1).join('');
}

/**
 * Split filename and count.
 * @param {String} fileName 
 * @returns filename and count
 */
function splitCountFromFile(fileName) {
  let splits = fileName.split('-');
  let count = splits.pop();

  return [splits.join('-'), count];
}


/**
 * Return the size of the file in GB
 * @param {String} fileName Name of the file
 * @returns 
 */
function findSize (fileName) {
  let stats = fs.statSync(fileName);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes / (1024*1024*1024); // Convert to GB
}

/**
 * Return the file name recursively in the given dir
 * @param {path} dir 
 * @returns file name
 */
function getFileRecursive(dir) {
  let files = fs
    .readdirSync(dir, { recursive: true, withFileTypes: true }) // withFileTypes return directen
    .filter(item => !item.isDirectory())
    .map(file => file.name);

  return files;
}

module.exports = {
  removeExt,
  splitCountFromFile,
  findSize,
  getFileRecursive
};