let Big = require("big.js");

// let preTest = (n, primes) => {
//     for (let prime of primes) {
//         if (n == Number(prime)) {
//             return 2
//         }
//         else if (Big(n).mod(Number(prime)).valueOf() == 0) {
//             // console.log("Even number detected")
//             return 0
//         } else return 1  
//     }
// }
module.exports = (n, primes) => {
    // // 
    // let pre = preTest(n, primes)
    // if (pre == 0) {
    //     // console.log("Even number detected")
    //     return false
    // } else if (pre == 2) {
    //     return true
    // } 
    if (Big(n).mod(Number(2)).valueOf() == 0) {
        // console.log("Even number detected")
        return false
    }
    let getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let a = getRandomInt(2, n - 2);
    // console.log("Random number a:", a);
    a = new Big(a);
    let res = a.pow((n - 1) /2).mod(n).valueOf();
     console.log("Test result: ", res);
     console.log("==================")
    return res
}