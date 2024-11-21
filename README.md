## Problem Statement
When downloading large files from Google Drive, they are split into multiple zip files. 

## Solution
This script extracts and combines all parts into one folder—just provide the first zip file's name and path.

## Pseudo code
1. The google drive downloded file format is ´´´foldername-timestamp-inc´´´
2. extract the file name and split counter from it
3. create a folder with timestamp. This will help us keep the folder name unique.
4. Take a zip, decompress and push data to the folder.
5. Repeat the step until all the zips are decompressed.

This approach can be used for other provider called smugmug.

## Lib details
The files that are less than 2GB can be decompress without stream. So the decompression is done using adm-zip.
The files that are more than 2GB follows stream approach. I added two libs for this. We can use either unzipper or node-stream-zip


## Step to run the program
```
npm start
```
