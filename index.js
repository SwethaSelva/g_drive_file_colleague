/**
 * @description When downloading large files from Google Drive, it split into multiple zip files. This script extracts and combines all parts into one folder. Just provide the first zip file's name and path.
 * */

const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');

/**
 * Remove the zip extension from the file name
 * @param {String} fileName 
 * @returns filename with '.zip'
 */
function removeExt (fileName) {
  if (!fileName.endsWith('.zip')) return fileName;

  return fileName.split('.').slice(0,-1).join('');
}

/**
 * Increment the count and keep the format 'xxx'
 * @param {String} numStr 
 * @returns 'xxx' + 1 = 'xxy'
 */
function driveCounter (numStr) {
  if (
    numStr.length > 3
    || Number.isNaN(+numStr)
    || +numStr > 998
  ) return numStr;

  let count = String(+numStr + 1);
  let remainingLength = 3 - count.length;
  return '0'.repeat(remainingLength) + count;
}

function smugMugCounter (numStr) {
  if (Number.isNaN(+numStr.at(-1))) return numStr;

  let splits = numStr.split(/(\d+)/);
  if (splits.at(-1) === '') splits.pop();

  let num = splits.pop();
  return `${splits.join('')}${+num + 1}`;
}

/**
 * Extract the zip file based on the filePath to outputPath
 * @param {path} filePath 
 * @param {path} outputPath 
 */
function compressFile (filePath, outputPath) {
  try {
    const zip = new AdmZip(filePath);
    zip.extractAllTo(outputPath, true);
    console.log(`Extraction completed for ${filePath}`);
  } catch (err) {
    console.error(`Error during extraction for ${filePath}: ${err}`);
  }
}

/**
 * Split filename and count.
 * @param {String} fileName 
 * @returns filename and count
 */
function splitCountFromFile (fileName) {
  let splits = fileName.split('-');
  let count = splits.pop();

  return [splits.join('-'), count];
}

/**
 * Decompress and combine all files to the folder
 * @param {String} fileName download zip file name
 * @param {path} filePath File path
 */
function main (fileName, filePath) {
  if (!fileName) return null;
  
  // Remove extn and split the count from filename
  let [folderName, count] = splitCountFromFile(removeExt(fileName));
  console.log(`**************** Output folder name ${folderName} ****************`);

  // Setting path and name
  let folderPath = `${filePath}/${folderName}`;
  let curFileName = `${folderName}-${count}.zip`;
  let curFilePath = `${folderPath}/${curFileName}`;

  // Compress the file
  do {
    compressFile(curFilePath, filePath);

    // Inc the count to move next file
    count = driveCounter(count);
    // count = smugMugCounter(count);
    curFileName = `${folderName}-${count}.zip`;
    curFilePath = `${folderPath}/${curFileName}`;
  } while (fs.existsSync(curFilePath))
}

let downloadPath = '../../../Downloads';
main("Swetha & Deepak ( Post-Wedding )-20241111T155811Z-001", downloadPath);