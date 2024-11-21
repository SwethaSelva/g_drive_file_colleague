/**
 * @description When downloading large files from Google Drive, it split into multiple zip files. This script extracts and combines all parts into one folder. Just provide the first zip file's name and path.
 * */

const fs = require('fs');
const path = require('path');

const { compressFileByADM } = require('./compress_file/adm_zip');
// const { compressFileByStream } = require('./compress_file/unzipper');
const { compressFileByStream } = require('./compress_file/node-stream-zip');
const { driveCounter, smugMugCounter } = require('./counter'); // counter by vendor
const { removeExt, splitCountFromFile, findSize } = require('./file_mainpulator');

/**
 * Decompress and combine all files to the folder
 * @param {String} fileName download zip file name
 * @param {path} filePath File path
 */
function main (fileName, filePath, vendor) {
  if (!fileName) return null;
  
  // Remove extn and split the count from filename
  let [folderName, count] = splitCountFromFile(removeExt(fileName));
  console.log(`**************** Output folder name ${folderName} ****************`);

  // Setting path and name
  let curFileName = `${folderName}-${count}.zip`;
  let curFilePath = `${filePath}/${curFileName}`;

  // Compress the file
  do {
    if (findSize(curFilePath) >= 2) compressFileByStream(curFilePath, filePath);
    else compressFileByADM(curFilePath, filePath);

    // Inc the count to move next file
    if (vendor == 'smugmug') count = smugMugCounter(count);
    else count = driveCounter(count);

    curFileName = `${folderName}-${count}.zip`;
    curFilePath = `${filePath}/${curFileName}`;
  } while (fs.existsSync(curFilePath))
}

let downloadPath = '../../../Downloads';
// main("Swetha & Deepak ( Post-Wedding )-20241111T155811Z-001", downloadPath);
main("takeout-20241119T095214Z-001.zip", downloadPath);
// main("album-d418375153-downloads-pt1.zip", downloadPath, "smugmug");