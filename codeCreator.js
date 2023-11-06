const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

const createZip = (path, zipName) => {
  // Create a new ZIP archive
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Define the source folder to be zipped
  // const sourceFolder = './my-folder';
  const sourceFolder = path;

  // Define the output file name and path
  // const outputFilePath = './my-folder.zip';
  const outputFilePath = `./archives/${zipName}`;

  // Create a write stream to the output file
  const output = fs.createWriteStream(outputFilePath);

  // Pipe the archive data to the output file
  archive.pipe(output);

  // Add the contents of the source folder to the archive
  archive.directory(sourceFolder, false);

  // Finalize the archive
  archive.finalize();

  // Log a message when the archive is finished
  output.on("close", function () {
    console.log(`Successfully created ZIP archive at ${outputFilePath}`);
  });
};
const BASE_PATH = path.join(__dirname, "test/new1");
// console.log(BASE_PATH);

const createFiles = (filename, content) => {
  fs.writeFile(filename, content, (err) => {
    if (err) throw err;
    console.log(`File '${filename}' has been saved.`);
  });
};

const checkFolderCreated = (folderPath) => {
  // let dirList = folderPath
  // console.log(folderPath);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

const createCode = (dependencies, files, name, cb) => {

  const dir = path.join(__dirname, "BoilerPlateCodes", name);
  checkFolderCreated(dir);

  files.forEach((file) => {
    let dirList = file.path.split('/');
    console.log(dirList);
    let temp ='';
    if(dirList.length>1){
      dirList.forEach(d => {
        temp+=d+'/'
        checkFolderCreated(path.join(dir, temp))
      })
      }else{
      checkFolderCreated(path.join(dir, file.path))
    }
    console.log(file);
    createFiles(path.join(dir, file.path, file.name), file.content);
  });
  createZip(dir, `${name}.zip`);
  cb(`${name}.zip`);
};

const createMultiCode = (frontend, backend, name, cb) => {

  const dir = path.join(__dirname, "BoilerPlateCodes", name);
  checkFolderCreated(dir);
  const frontendDir = path.join(dir, 'frontend');
  checkFolderCreated(frontendDir);
  
  frontend.files.forEach((file) => {
    checkFolderCreated(path.join(frontendDir, file.path));
    createFiles(path.join(frontendDir, file.path, file.name), file.content);
  });
  
  const backendDir = path.join(dir, 'backend');
  checkFolderCreated(backendDir);
  backend.files.forEach((file) => {
    checkFolderCreated(path.join(backendDir, file.path));
    createFiles(path.join(backendDir, file.path, file.name), file.content);
  });
  createZip(dir, `${name}.zip`);
  cb(`${name}.zip`);
};

const packageBuilder = (libraries) => {
  let dependencies = ``;
  libraries.forEach(async ({ name, package, version }) => {
    // let version = await getPackageVersion(package);
    // console.log(version);
    dependencies += `"${package}": "^${version}",\n`;
  });
  console.log('dependencies', dependencies);
  // console.log(dependencies);
  return dependencies;

}


module.exports = { createCode, createMultiCode };