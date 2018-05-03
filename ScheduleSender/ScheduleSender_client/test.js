// var str = "[2018,4,4,14,7,33]"
// let arr = Array(str);
// console.log(arr)
let t = new Date(...[2018, 3, 2, 2, 2]);
console.log(t.getTime())
console.log(new Date(t.getTime()).getFullYear())