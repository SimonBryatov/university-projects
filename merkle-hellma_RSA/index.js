let Big = require("bignumber.js");
let _ = require("lodash")

let random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

let getRandomSeq = (length, step) => {
    seq = []
    for (var i = 0; i < length; i++) {

    }
}

let getRandCoprime = (prime) => {
    let coprime = random(1, prime - 1)
    while (!(prime % coprime == 1)) {
        coprime = random(1, prime - 1)
    }
    return coprime
}

let getPublicKey = (superSeq, r, q) => {
    let res = superSeq.map((el) => {
        return (el * r) % q
    }) 
    return res
}

let completeStrToLength = (str, l) => {
   let diff = l - str.length
   console.log(diff)
   let res = str
   for (var i = 0; i < diff; i++) {
       res = "0" + res
   }  
   return res
}

let binArrFromString = (str) => {
    let arr = str.split("");
    arr = arr.map((el, i) => {
        return completeStrToLength(str.charCodeAt(i).toString(2), 8)
        
    })
   // console.log(arr);
    return arr.join("").split("").map((d) => Number(d))
}

let stringFromBinArr = (arr) => {
    arr = _.chunk(arr, 8);
    console.log(arr)
    arr = arr.map((arr) => arr.reduce((a, b) => a+b));
    console.log(arr)
    // return arr.join("").split("").map((d) => Number(d))
}

let superSeq = [2, 7, 11, 21, 42, 89, 180, 354]

let sSum = superSeq.reduce((a, b) => {return a+b}, 0);
let q = 881
let r = 588 //getRandCoprime(881)
let publicKey = getPublicKey(superSeq, r, q)

let plainText = "Wow, Such Doge"
let pTbin = binArrFromString(plainText); //Buffer.from(plainText, 'utf-8');
console.log(r)
console.log(publicKey)
console.log(stringFromBinArr(pTbin))
