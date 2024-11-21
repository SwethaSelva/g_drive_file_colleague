const StreamZip = require('node-stream-zip');

let downloadPath = '../../../Downloads/takeout-20241119T095214Z-002.zip';

/**
 * Extract the zip file based on the filePath to outputPath
 * @param {path} filePath 
 * @param {path} outputPath 
 */
function compressFileByStream(filePath, outputPath) {
  const zip = new StreamZip.async({ file: filePath });
  (async () => {
    try {
      await zip.extract(null, outputPath);
      console.log('Extraction successful');
    } catch (err) {
      console.error('Extraction error:', err);
    } finally {
      await zip.close();
    }
  })();

}

module.exports = {
  compressFileByStream
};
