const StreamZip = require('node-stream-zip');

/**
 * Extract the zip file based on the filePath to outputPath
 * @param {path} filePath 
 * @param {path} outputPath 
 */
async function compressFileByStream(filePath, outputPath) {
  const zip = new StreamZip.async({ file: filePath });
  (async () => {
    try {
      await zip.extract(null, outputPath);
      console.log(`Extraction completed for ${filePath} by stream`);
    } catch (err) {
      console.error(`Stream: Error during extraction for ${filePath}: ${err}`);
    } finally {
      await zip.close();
    }
  })();
}

module.exports = {
  compressFileByStream
};
