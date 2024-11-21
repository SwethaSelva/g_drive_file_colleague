'use strict';

var fs = require('fs');
var unzipper = require('unzipper');

/**
 * Extract the zip file based on the filePath to outputPath
 * @param {path} filePath 
 * @param {path} outputPath 
 */
function compressFileByUnzipper(filePath, outputPath) {
  console.log({ filePath, outputPath })
  let fileName = filePath.split('/').pop();
  fs.createReadStream(filePath)
  .pipe(unzipper.Extract({ path: outputPath }))
  .on('close', () => {
    console.log(`The file ${fileName} is compressed successfully`);
  })
  .on('error', (error) => {
    console.log(`The error while unzipping file ${fileName}`, error)
  });
}

module.exports = {
  compressFileByUnzipper
};