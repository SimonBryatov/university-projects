let lTest = require("./lemanTest");
Big = require("bignumber.js");
Big.config({ POW_PRECISION: 0 })
Big.config({ EXPONENTIAL_AT: 1e+9 })

let random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let getBigRandomString = (it_limit) => {
    let res = "";
    res += random(1, 99999999999999);
    for (var i = 1; i < it_limit; i++) {
        res += random(0, 99999999999999);
    }
    return res
}



let preTest = (n, primes) => {
    for (let prime of primes) {
        if (n.eq(new Big(prime))) {
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
// let n = Big(num).mod(2).valueOf()

let found = false;
while (!found) {
let num = getBigRandomString(25)
console.log("Inspecting number " + num)
//console.log(n)
n = Big("93113")
////////////////////////
let k = 10
let res = [];
let flag = 1
let pre = preTest(n, primes)
if (pre == 0) {
    console.log(num + "\n is definetely NOT a prime number")
} else if (pre == 2) {
    console.log(num + "\n is definetely a prime number")
} else {
for (var i = 0; i < k; i++) {
let localRes = lTest(n);
if (!(localRes.eq(1) || localRes.eq(n.minus(1)))) {
    flag = 0;
    break;
} else res.push(localRes)
}

if (!flag) {
    console.log(num + " is definetely NOT a prime number")
} else {
    let mistake = (1 / (Math.pow(2, k))).toFixed(10)
    console.log(num + "\n is a prime number with probability of mistake: " + mistake)
    found = true
    console.log("Size of number is " + num.toString(2).length + " bits")
}
}
}