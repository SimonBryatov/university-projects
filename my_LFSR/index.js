chalk = require("chalk")
function* lfsr(initial_seq, parameters) {
    //let prev_seq = initial_seq;
    let period = 1;
    let curr_seq = initial_seq.split(""), newBit = 0;
    curr_seq = curr_seq.map((el) => parseInt(el));
    //let outputBit = 
    // parameters = parameters.map((el) => parseInt(el));
    while (true) {
        // console.log(prev_seq)
        newBit = 0;
        parameters.forEach((el) => {
                newBit += parseInt(curr_seq[el])
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
   let gen = new Generator(initial_state, parameters);
  // let maxPeriod = Math.pow(2, initial_state.length) - 1
  // let max_seq = gen.getSeq(maxPeriod * 2);
  // let found = false 
  // let period = maxPeriod
  // console.log(max_seq)
  // while (period != 5) {         
  //  let sub1 = max_seq.slice(0, maxPeriod);
  //  let sub2 = max_seq.slice(maxPeriod, maxPeriod*2); 
  //  console.log(sub1, sub2)
  //  if (sub1 = sub2) found = true;
  // }
  let length = initial_state.length
  let period = 1
  gen.getSeq(length);
  let f_state = gen.getSeq(length)
  let next_state = gen.getSeq(length)
  let tailFlag = 0
  while (f_state != next_state) {
    period++;
    // console.log(period)
    if (period > (Math.pow(2, initial_state.length) - 1)) {
      tailFlag = 1
      break
    }
    next_state = gen.getSeq(length)
  } 
  if (tailFlag) {
    console.log("tailed")
    gen = new Generator(initial_state, parameters);
    gen.getSeq(length + 1);
    f_state = gen.getSeq(length);
    next_state = gen.getSeq(length);
    period = 1;
    while (f_state != next_state) {
      period++;
      next_state = gen.getSeq(length)
    } 
    return period;
  }
  return period
}

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
};

let getStr = (l) => {
  let res = ""
  for (var i = 0; i < l; i++) {
    res += random(0, 1)
  }
  return res
}

let l = 19;
let state = getStr(l);
console.log(`Init state: `, state)
let param = [13, 16, 17,18]
console.log(chalk.yellow(`Period of [${param}] generator: `), periodCounter(state, param)); 
g1 = new Generator(state, param);
g1.getSeq(state.length);
seq = (g1.getSeq(1000000));
let alpha = 0.01;
console.log(chalk.green(`Running tests with alpha = ${alpha} ...`))
// console.log(seq.slice(0, 131070) == seq.slice(131071, 131071 * 2 - 1))
testSuite = require("nist-randomness-test-suite");
let tests = new testSuite(alpha);
console.log("Exponent file read...")
var fs = require('fs');
var file = fs.readFileSync("./e", "utf8");
let e = file.replace(/[^a-z0-9]/gi, "");
st = require("./serialTest");
e = e.slice(0, 1000000)
// console.log(st(e, 0.01))
console.log(chalk.blue("========================="));
console.log(chalk.yellow("Frequency Test for e: "), tests.frequencyTest(e))
 console.log(chalk.yellow("Frequency Test for user sequence: "), tests.frequencyTest(seq))
 console.log(chalk.blue("========================="));
console.log(chalk.yellow("Runs Test for e: "), tests.runsTest(e))
console.log(chalk.yellow("Runs Test for user sequence: "), tests.runsTest(seq))
console.log(chalk.blue("========================="));
 console.log(chalk.yellow("The Serial Test for e: "), st(e, 0.01))
console.log(chalk.yellow("The Serial Test for user sequence: "), st(seq, 0.01))


