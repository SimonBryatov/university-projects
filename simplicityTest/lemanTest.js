let Big = require("big.js");

module.exports = (n, primes) => {
    let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let a = getRandomInt(2, n - 2);
    console.log("Random number a:", a);
    a = new Big(a);
    let res = a.pow((n - 1) /2).mod(n).valueOf();
     console.log("Test result: ", res);
     console.log("==================")
    return res
}