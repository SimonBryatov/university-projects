LFSR = require('lfsr');
 
let bitLength = 5
let initialState = parseInt('10010', '10000') // seed1 
let lfsr1 = new LFSR(bitLength, initialState);

    initialState = parseInt('11111', 2) // seed2 
let lfsr2 = new LFSR(bitLength, initialState);

    initialState = parseInt('10011', 2) // seed3
let lfsr3 = new LFSR(bitLength, initialState);

    
    let getPeriod = (gens) => {
        gens.forEach(lfsr => {
            
    let first = lfsr.seqString(5);
    let counter = 1;

    while(lfsr.seqString(5) != first) {
  counter++;
    }
    console.log(counter);

    console.log(lfsr.seqString(5));
    console.log(lfsr.seqString(5));
    console.log(lfsr.seqString(5));
});
    }   

    let gens = [lfsr1, lfsr2, lfsr3];

    getPeriod(gens);

console.log("wooof")
initialState = parseInt('10011', 2)
console.log(initialState) // seed1 
let lfsr4 = new LFSR(bitLength, initialState);

for (var i = 0; i < 32; i++) {
    console.log(lfsr4.seqString(5));
}