var math = require('../utils/math');

module.exports = function runTest(bits){
  // pre: bits should be an array containing only 0 and 1 as a number
  // console.log(bits)
  var n = bits.length;
  var pi = math.sum(bits) / n;
  // console.log(pi)
  if(Math.abs(pi - 0.5) >= 2 / Math.sqrt(n)) return 0;
  var r = (_, k) => bits[k] == bits[k+1]? 0: 1;
  var s = math.sum(bits.map(r));
  // console.log(s)
  var m = 2 * n * pi * (1 - pi);
  var PValue = math.erfc(math.abs(s - m)/(Math.sqrt(2 * n) * (m / n)));
  console.log(PValue)
  return PValue;
};
