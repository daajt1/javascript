const peaks = ["Tallac","Ralston","Rose"];
const [last] = peaks.reverse();

console.log(last);
console.log(peaks.join(", "));

function direction(...args){
    let [start, ...remaining] =args;
    let [finish, ...stops] = remaining.reverse();

    console.log(`drove through ${args.length} towns`);
    console.log(`start in ${start}`);
    console.log(``)

}

let numeroMayor = Math.max(4,16,23,2,45,8);

console.log(numeroMayor);

let numeros = [4,6,15,200,75,8];

let numeroMayor1 = Math.max(...numeros);

console.log(numeroMayor);

var certstoAdd = ['Algorithms and data structures','front end libraries'];
var certification = ['part of this array', ...certstoAdd, 'included in this package']

console.log(certification);

function addThreenumbersarray(x,y,z) {
    console.log(x+y+z);
}

var args = [0,1,2,3,4,5]
addThreenumbersarray(...args);

console.log(addThreenumbersarray);

//copiar arrays

var arr1 = [0,2,3];
var arr2 = [...arr1];
var arr3 = [...arr1,arr2]
var arr4 = arr1.concat(arr2)
arr2.push(4);
console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);


const multiply=  (multiplier,...args) =>{
  return  args.map(function(element){return multiplier *element})
}

var arr = multiply(10,2,3,4)
console.log(arr)