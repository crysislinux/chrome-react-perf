'use strict';
var fs = require('fs');
let measurementsData;

var data = fs.readFileSync(`${__dirname}/measurements.data`, 'utf8');


console.log(data);
