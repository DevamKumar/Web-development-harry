// console.log("hello");

// const greetings = () => {};

// const add = (a: number, b: number): number => {
//   return a / b;
// };

// const v = (a: number, b: number, c: number, d:number):number => {return c * b + a - d};

// const greet00 = (name: string) => {
//   return `Hello, ${name}!`;
// };

// const sayHello = () => {
//   console.log("Hello! Hi there");
// };
// console.log(add(534534, 564578));
// console.log(greet00("Devam"));
// sayHello();
// console.log(v(1, 2, 3, 4));

// function main(params:type) {
    
// }



'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;
process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';
    main(2,3);
});

function readLine(): string {
    return inputLines[currentLine++];
}

function main(a:number,b:number):number {
    return a+b;
}

console.log(main(2,3));