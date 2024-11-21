const AdmZip = require('adm-zip');
const path = require('path');

/**
 * Extract the zip file based on the filePath to outputPath
 * @param {path} filePath 
 * @param {path} outputPath 
 */
function compressFileByADM(filePath, outputPath) {
  try {
    const zip = new AdmZip(filePath);
    zip.extractAllTo(outputPath, true);
    console.log(`Extraction completed for ${filePath}`);
  } catch (err) {
    console.error(`Error during extraction for ${filePath}: ${err}`);
  }
}

module.exports = {
  compressFileByADM
};