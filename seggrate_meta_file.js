/**
  1. Read files recursively in the folder
  2. Split the .json file and put it in the another file

  Criteria for a meta file
  1. Extn should be '.json'
  2. Remove the extn '.json' and the file name matches with previous file
*/

let fs = require('fs');

function readFolderRecurse (folderPath) {
  try {
    const files = fs.readdirSync(folderPath, { withFileTypes: true });
    if (!files.length) return files;

    let metadataCount = 0;
    const metaDataPath = `${folderPath}/meta_data`;

    if (fs.existsSync(metaDataPath)) fs.rmdirSync(metaDataPath);
    fs.mkdirSync(metaDataPath);

    for (let i = 1; i < files.length; i++) {
      let { name, parentPath } = files[i];
      let filePath = `${parentPath}/${name}`;

      if (files[i].isDirectory()) {
        readFolderRecurse(filePath);
        continue;
      }

      if (!files[i-1]) continue;

      let fileExtn = name.split('.').pop();
      if (fileExtn === 'json' && `${files[i-1].name}.json` == name) {
        metadataCount++;
        fs.renameSync(filePath, metaDataPath + '/' + name);
      }
    }

    if (!metadataCount) fs.rmdirSync(metaDataPath);
    return files;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readFolderRecurse
}

let downloadPath = '../../../Downloads';
readFolderRecurse(downloadPath + '/Takeout');