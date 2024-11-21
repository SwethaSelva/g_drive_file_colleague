const fs = require('fs');

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

function findSize (fileName) {
  let stats = fs.statSync(fileName);
  let fileSizeInBytes = stats.size;console.log({ fileSizeInBytes });
  // Convert the file size to gigabytes
  return fileSizeInBytes / (1024*1024*1024);
}

module.exports = {
  removeExt,
  splitCountFromFile,
  findSize
};