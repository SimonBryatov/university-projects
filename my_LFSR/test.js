let st = require("./serialTest")

var fs = require('fs');
var file = fs.readFileSync("./data.e", "utf8");
let e = file.replace(/[^a-z0-9]/gi, "");

console.log(e.length)
seq = "00000000000010000000000001"
console.log(e.slice(0, 50) + e.slice(0, 50))
st(seq);
