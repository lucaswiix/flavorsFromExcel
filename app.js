const XLSX = require('xlsx');
const fs = require('fs');
const moment = require('moment');

var workbook = XLSX.readFile('flavorsebt.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const jsonString = JSON.stringify(xlData)

var sqlData = [];

// var sql "CREATE TABLE `flavorsebt` ( `id` bigint(20) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `vCPU` bigint(20) DEFAULT NULL, `memory` bigint(20) DEFAULT NULL, `price` decimal(19,6) DEFAULT NULL, `location` varchar(255) DEFAULT NULL, `versionDate` datetime DEFAULT NULL, `currency` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=53011 DEFAULT CHARSET=latin1";
var sql = "INSERT INTO flavorsebt (name, vCPU, memory, price, location, versionDate, currency) VALUES ";
xlData.forEach((x, index) => {
    if(index > 0 && index < 24){
        var nameArr = x.__EMPTY.split('-');
        var vcpu = parseInt(nameArr[1].replace('vCPU', ''));
        var memory = parseFloat(nameArr[2].replace('GB', '')*1000);
        var price = x.__EMPTY_1;

        let jsn = {
            'name': x.__EMPTY,
            'vCPU': vcpu,
            'memory': memory,
            'price': price,
            'location': 'South america (Sao paulo)',
            'versionDate': moment().format('YYYY-MM-DD HH:mm:ss'),
            'currency':'USD'
        };

        sqlData.push(jsn);
    }
});
sqlData.forEach(x => {
    sql+="('"+x.name+"', ";
    sql+="'"+x.vCPU+"', ";
    sql+="'"+x.memory+"', ";
    sql+="'"+x.price+"', ";
    sql+="'"+x.location+"', ";
    sql+="'"+x.versionDate+"', ";

    sql+="'"+x.currency+"'), ";
});

var nsql = sql.substr(0,(sql.length - 2));
       sql = nsql;
    sql+= ";";

    
    console.log(sql);


fs.writeFile("data.sql", sql, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("saved file");
    }
}); 

/*
 CREATE TABLE `flavorsebt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `vCPU` bigint(20) DEFAULT NULL,
  `memory` bigint(20) DEFAULT NULL,
  `price` decimal(19,6) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `versionDate` datetime DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53011 DEFAULT CHARSET=latin1
*/
