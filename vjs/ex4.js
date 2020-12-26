const add =(x=5, y=12)=> console.log(x+y);

"use strict"

var add = ()=> {
    var x = arguments.length <=0 || arguments[0] === undefined ? 5 : arguments[0];
}
const e = {
    mountains: [
        "f1",
        "r2",
        "t3",
        "r4"
    ],
    print: function(delay= 1000) {
        setTimeout(function(delay = 1000) {
            console.log(this.mountains.join(", "))
             },delay);
    }
}

//Destructuring
const [firstAnimal] = ["horse","mouse","cat"];

console.log(firstAnimal);

const [,,thirdAnimal] = ["horse","mouse","cat"];

// Object Literal Enhancement

const name1 = "tallac";
const elevation = "04564";

const funhiki =  {name1,elevation}

// Metodo de objeto 
const print  = ()=> {
    console.log(`mt ${this.name1} is ${this.elevation} feet tall`)
}

funhiki.print();

var myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year =  "1934";


const directions = (...args) => {
    let {start, ...remaining} = args;
    let {finish, ...stops} = remaining.reverse();

    console.log( ` drive through ${args.length} towns  start in ${start} the destination is ${finish} stopping in 
    ${stops.length} times in between`)
}