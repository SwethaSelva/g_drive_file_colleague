/**
 * @description When downloading large files from Google Drive, it split into multiple zip files. This script extracts and combines all parts into one folder. Just provide the first zip file's name and path.
 * */

const fs = require('fs');
const path = require('path');

const { compressFileByADM } = require('./compress_file/adm_zip');
const { compressFileByStream } = require('./compress_file/node-stream-zip');
const { driveCounter, smugMugCounter } = require('./counter'); // customise counter for each vendor
const { removeExt, splitCountFromFile, findSize } = require('./file_utils');
const { readFolderRecurse } = require('./seggrate_meta_file');

/**
 * Decompress and combine all files to the folder
 * @param {String} fileName download zip file name
 * @param {path} filePath File path
 */
function mergeMultiPartZip (fileName, filePath, vendor) {
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
  } while (fs.existsSync(curFilePath));
}

let downloadPath = '../../../Downloads';
// mergeMultiPartZip("Swetha & Deepak ( Post-Wedding )-20241111T155811Z-001", downloadPath);
// mergeMultiPartZip("album-d418375153-downloads-pt1.zip", downloadPath, "smugmug");

// Google Takeout
mergeMultiPartZip("takeout-20241125T123611Z-001.zip", downloadPath);