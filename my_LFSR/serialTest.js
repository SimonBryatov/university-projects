math = require("mathjs");
_ = require("lodash");
module.exports = (seq, alpha) => {
 let seq1 = seq + seq[0];
 let seq2 = seq + seq[0] + seq[1];


function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

 let patterns2 = ["000", '001', '010', '011', '100', '101', '110', '111']
 let patterns1 = ["00", "01", "10", "11"]
 let patterns0 = ["0", "1"]
//  seq1 = seq.match(/.{1,2}/g)
//  seq2 = seq.match(/.{3}/g)
//  let entries2 = _.countBy(seq2);
//  let entries1 = _.countBy(seq1);
 let entries0 = _.countBy(seq.split(""))
 
let entries2 = patterns2.map((el)=> {
    return occurrences(seq1, el, 1)
})
let entries1 = patterns1.map((el)=> {
    return occurrences(seq1, el, 1)
})
console.log(entries2, entries1, entries0);
  console.log(occurrences(seq1, "11", 1))

 psiSquare = (arr, n, m, it) => (
     (Math.pow(2, m - it)/n * arr.reduce((sum, el) => {
    //   console.log(sum)
        return sum += Math.pow(el, 2)         
     }, 0)) - n 
 ).toFixed(1)
 
 psi2 = Number(psiSquare(Object.values(entries2), seq.length, 3, 0));
 psi1 = Number(psiSquare(Object.values(entries1), seq.length, 3, 1));
 psi0 = Number(psiSquare(Object.values(entries0), seq.length, 3, 2));

 console.log("PSI: ", psi2, psi1, psi0)
 console.log(psi0*2)
let igamc = require("incomplete-gamma");
// let efrc = require("math-erfc")
 nabla = psi1 - psi0
 nablaSquared = psi1 - 2*psi0
 console.log("Nablas", nabla, nablaSquared)
 let p1 = igamc.upper(2, nabla/2)
 console.log(p1, alpha)
 return(p1 > alpha);
 

    
}