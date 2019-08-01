const XLSX = require('xlsx');
const fs = require('fs');

var workbook = XLSX.readFile('flavors-connect-cloud.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const jsonString = JSON.stringify(xlData)

fs.writeFile("data.json", jsonString, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("saved file");
    }
}); 
