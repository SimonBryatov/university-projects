let st = require("./serialTest")

var fs = require('fs');
var file = fs.readFileSync("./e", "utf8");
let e = file.replace(/[^a-z0-9]/gi, "");

console.log(e.length)

console.log(`Test completed: ` + st(e, 0.01));
