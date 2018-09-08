var fs = require("fs");

var fileContent = fs.readFileSync("test_read.txt", "utf8");

// var tmp_1 = fileContent.slice(0, 5);
// var tmp_2 = fileContent.slice(22, 32);
// fileContent = fileContent.substring(7, 19);
// fileContent = tmp_2 + fileContent + tmp_1;
// console.log(fileContent);

fs.writeFile('mynewfile.txt', fileContent, function (err) {
  if (err) throw err;
  console.log('////////////');
});

var file = fs.readFile("mynewfile.txt", "utf8",
            function(error,data){
                if(error) throw error;
                console.log(data);
});
console.log(fileContent);
