let lTest = require("./lemanTest");
// console.log(Math.pow(25, 50) % 101)
var fs = require('fs');
var file = fs.readFileSync("./primes.txt", "utf8");
let primes = file.split(/[^0-9]/gi).filter(Boolean);
////////////////////////
let num = 26793
////////////////////////
let k = 10
let res = [];
let flag = 1
for (var i = 0; i < k; i++) {
let localRes = Number(lTest(num, primes))
if (!(localRes == 1 || localRes == num - 1)) {
    flag = 0;
    break;
} else res.push(localRes)
}

if (!flag) {
    console.log(num + " is definetely not a prime number")
} else if (res.indexOf(num - 1) >= 0) {
    let mistake = (1 / (Math.pow(2, k))).toFixed(10)
    console.log(num + " is a prime number with probability of mistake: " + mistake)
} else {
    console.log('gay')
}
