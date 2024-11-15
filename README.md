When downloading large files from Google Drive, they are split into multiple zip files. This script extracts and combines all parts into one folder—just provide the first zip file's name and path.


1. The google drive downloded file format is ´´´foldername-timestamp-inc´´´
2. extract the file name and split counter from it
3. create a folder with timestamp. This will help us keep the folder name unique.
4. Take a zip, decompress and push data to the folder.
5. Repeat the step until all the zips are decompressed.



The decompression is done using adm-zip


Step to run the program
npm start or npm run start