//let Big = require("bignumber.js");

module.exports = (n, primes) => {
    let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let a = getRandomInt(2, 100);
    console.log("Random number a:", a);
    a = new Big(a);
    let res = a.pow(n.minus(1).div(2), n);
     console.log("Test result: ", res.toString());
     console.log("==================")
    return res
}