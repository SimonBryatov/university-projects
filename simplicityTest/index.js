let lTest = require("./lemanTest");
let Big = require("big.js");

let preTest = (n, primes) => {
    for (let prime of primes) {
        if (n == Number(prime)) {
            console.log("Detected equality to saved prime!")
            return 2
        }
        else if (Big(n).mod(Number(prime)).valueOf() == 0) {
            console.log(`Detected division by saved prime: '${prime}' !`)
            return 0
        }  
    }
    return 1
}

var fs = require('fs');
var file = fs.readFileSync("./primes.txt", "utf8");
let primes = file.split(/[^0-9]/gi).filter(Boolean);
////////////////////////
let n = Big(3213312321321321321312321312321213213123123231).mod(2).valueOf()
console.log(n)
////////////////////////
let k = 10
let res = [];
let flag = 1
let pre = preTest(num, primes)
if (pre == 0) {
    console.log(num + " is definetely NOT a prime number")
} else if (pre == 2) {
    console.log(num + " is definetely a prime number")
} else {
for (var i = 0; i < k; i++) {
let localRes = Number(lTest(num, primes))
if (!(localRes == 1 || localRes == num - 1)) {
    flag = 0;
    break;
} else res.push(localRes)
}

if (!flag) {
    console.log(num + " is definetely NOT a prime number")
} else if (res.indexOf(num - 1) >= 0) {
    let mistake = (1 / (Math.pow(2, k))).toFixed(10)
    console.log(num + " is a prime number with probability of mistake: " + mistake)
} else {
    console.log(num + " is a prime number")
}
}