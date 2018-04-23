function* lfsr(initial_seq, parameters) {
    //let prev_seq = initial_seq;
    let period = 1;
    let curr_seq = initial_seq.split(""), newBit = 0;
    curr_seq = curr_seq.map((el) => parseInt(el));
    //let outputBit = 
    parameters = parameters.split("");
    parameters = parameters.map((el) => parseInt(el));
    while (true) {
        // console.log(prev_seq)
        newBit = 0;
        parameters.forEach((el, ind) => {
            if (parseInt(el) == 1) {
                // console.log(ind)
                newBit += parseInt(curr_seq[ind])
            }
            })
        newBit = newBit % 2;
        // console.log(curr_seq);
        let output = curr_seq.pop();
        curr_seq.unshift(newBit);
        // console.log(curr_seq.join(""));
      yield output;
    }
  }


// let periodTester = (initial_state, parameters) => {
 
// let gen = lfsr(initial_state, parameters);

// //console.log(initial_state);
// // var curr_state = gen.next().value;
//  let counter = 1;
// //while (curr_state != initial_state) {

// while (counter != 10) {
// counter++;
// console.log(gen.next().value);
// }
//  console.log('Sequence period is ' + counter );
// }

// periodTester("11001", '10010');
//periodTester("00001", '11011');
//periodTester("00001", '11011');

// console.log(gen.next());
// console.log((1+1) % 2);

function Generator(initial_state, parameters) {
   this.lfsr = lfsr(initial_state, parameters)
   this.getSeq = (num) => {
    output = ""  
    if (!num) num = 1000000;
    for (var i = 0; i 
        < num; i++) {
      output += this.lfsr.next().value;
   }

   return output;
}
}

let periodCounter = (initial_state, parameters) => {
  let period = null;
  outputLength = 1;
  while (!period) {         
   let trustConter = 0;   
   let  gen = new Generator(initial_state, parameters);
   let firstOutput = gen.getSeq(outputLength); 
      
  }
}

let g1 = new Generator("0101", '1001');
let seq = (g1.getSeq(1000000));
testSuite = require("nist-randomness-test-suite");
let alpha = "0.01";
let tests = new testSuite(alpha);



var fs = require('fs');
var file = fs.readFileSync("./data.e", "utf8");
let e = file.replace(/[^a-z0-9]/gi, "");
// console.log("Non Overlapping Template Matching Test for e: ", tests.nonOverlappingTemplateMatchingTest(e))
// console.log("Non Overlapping Template Matching Test for user sequence: ", tests.nonOverlappingTemplateMatchingTest(seq))
// console.log("=========================")
// console.log("Binary Matrix Rank Test for e: ", tests.binaryMatrixRankTest(e))
// console.log("Binary Matrix Rank Test for user sequence: ", tests.binaryMatrixRankTest(seq))
// console.log("=========================");

st = require("./serialTest");
console.log("The Serial Test for e: ", st(e))
console.log("The Serial Test for user sequence: ", st(seq))
