console.log("Hello World!");

let name;
console.log(typeof name) // undefined
name = "Bùi Tiến"; // string 
let age =24; // number
let status = true; // boolean

const PI = 3.14;
// PI=3.15;

//Template String (Template Literal - ES6)
name = "Bùi Tiến";
let year = 2001;
let message = `Xin chào mọi người tôi là ${name}, tôi năm nay ${2024-year} tuổi`;
console.log(message)

//Function
//c1 : Function declaration
/* Java 
public int sum (int a, int b){
    return a+b;
}
*/
function sum(a,b){
    return a+b;
}

//c2: Function expression
let sum2 = function(a,b){
    return a*b;
}

//c3: Arrow function || lamda expression - Java
let sum3= (a,b) =>{
    return a+b;
}

console.log(sum(4,"5"));
console.log(sum2(4,"5"));
console.log(sum3(4,typeof 5));