let Big = require("bignumber.js");
let _ = require("lodash")
let math = require("mathjs")

let random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

function modinv(a,m) {
    var v = 1;
    var d = a;
    var u = (a == 1);
    var t = 1-u;
    if (t == 1) {
        var c = m % a;
        u = Math.floor(m/a);
        while (c != 1 && t == 1) {
               var q = Math.floor(d/c);
               d = d % c;
               v = v + q*u;
               t = (d != 1);
               if (t == 1) {
                   q = Math.floor(c/d);
                   c = c % d;
                   u = u + q*v;
               }
        }
        u = v*(1 - t) + t*(m - u);
    }
    return u;
}

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
//    console.log(diff)
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
    return arr//.join("").split("").map((d) => Number(d))
}

let stringFromBinArr = (arr) => {
    // arr = _.chunk(arr, 8);
    // console.log(arr)
    // arr = arr.map((arr) => arr.reduce((a, b) => a + String(b)));
    // console.log(arr)
    arr = arr.map((c) => String.fromCharCode(parseInt(c, 2)))
    return arr.join("")
    // return arr.join("").split("").map((d) => Number(d))
}

let encrypt = (arr, key) => {
    arr = arr.map((str) => str.split(""))
    // console.log(arr)
    let res = arr.map(c => c.reduce((a, b, ind) => a + Number(b) * key[ind], 0))
    return res
}

let decrypt = (arr, w, q, r) => {
    let rInv = modinv(r, q)
    arr = arr.map((n) => {
        // console.log(n)
        let b = (n * rInv) % q
        return b 
        // console.log(b)
    })
    //  console.log(arr);
    //  console.log(w)
    arr = arr.map((n) => {
        diff = 1
        // let w = w
        //  let r = []
        res = [0, 0, 0, 0, 0, 0, 0, 0]
        while(n != 0) {
            let max = getNextMax(w, n)
            // console.log(max)
            // r.push(max)
            // console.log()
            res[w.indexOf(max)] = 1
           n = n - max
        //    console.log(n)
        }
        // console.log(r)
        return res.join("")
    })
    // console.log(arr)
    return arr
}

let getNextMax = (ar, n) => {
    let arr = Array(...ar)
    // console.log(arr)
    if (arr.indexOf(n) >= 0) {
        return n
    }
    arr.push(n);
    arr = _.sortBy(arr);
    if (arr.indexOf(n) == arr.length - 1) {
        return arr[arr.length - 2]
    } else if (arr.indexOf(n) == 0) return arr[0]
    return arr[arr.indexOf(n) - 1]
    
} 

let superSeq = [2, 7, 11, 21, 42, 89, 180, 354]

let sSum = superSeq.reduce((a, b) => {return a+b}, 0);
let q = 881
let r = 588 //getRandCoprime(881)
let publicKey = getPublicKey(superSeq, r, q)

let plainText = "WWwWWa"
let pTbin = binArrFromString(plainText); //Buffer.from(plainText, 'utf-8');
console.log(`w: `, sSum)
console.log(`q: `, q)
console.log(`r: `, r)
console.log(`Public key: `, publicKey)
console.log(pTbin)
// console.log(stringFromBinArr(pTbin))
let cypherText = encrypt(pTbin, publicKey)
console.log(`CipherArray: `, cypherText)
// console.log();
let decrypted = decrypt(cypherText, superSeq, q, r)
console.log(stringFromBinArr(decrypted))
