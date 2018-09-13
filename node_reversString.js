var fs = require("fs");

var fileContent = fs.readFileSync("test_read.txt", "utf8");
console.log(fileContent);
var tmp_1 = fileContent.substring(0, fileContent.indexOf("\n"));
var tmp_2 = fileContent.substring(fileContent.lastIndexOf("\n"));
fileContent = fileContent.substring(fileContent.indexOf("\n"), fileContent.lastIndexOf("\n"));
fileContent = tmp_2 + "\n" + fileContent + "\n" + tmp_1;

console.log("/////////////////////////");
fs.writeFileSync('mynewfile.txt', fileContent);

var e =  fs.readFileSync('mynewfile.txt', "utf8");

console.log(e);
