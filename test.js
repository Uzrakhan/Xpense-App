/*
const numbers = [1,2,3,4,5];

const filteredNumbers  = numbers.filter(num => num > 0);

console.log(filteredNumbers);

const words = ["Aditya","Uzra","Jhanak"];

const filteredWords  = words.filter(word => word.length < 9);

console.log(filteredWords);

const people = [
  {name: 'Anirban', age: 30},
  {name: 'Sen', age: 23},
  {name: 'Uzra', age: 10}
];

const adults = people.filter(person => person.age <= 18);

console.log(adults);


const inventory = ["mango", "apple","guava"];

const item = inventory.find((fruit) => fruit === "mango");

console.log(item ? "available" : "not available");
*/

/*
find() question 1
const numbers = [3, 7, 8, 15, 24, 19];

const evenNum = numbers.find((num) => num % 2 === 0);

console.log(evenNum);

//question 2
const users = [
  { id: 1, username: "alice" },
  { id: 2, username: "john_doe" },
  { id: 3, username: "charlie" }
];

const person = users.find((user) => user.username === "john_doe");

console.log(person);

// question 3
const words = ["run","pumping","jumping", "playing", "walk"];

const string = words.find((word) => word.includes("ing"));

console.log(string);
*/

/*filter()
//question 1
const numbers = [3, 7, 8, 15, 24, 19];

const oddNum = numbers.filter((num) => num % 2 !== 0);

console.log(oddNum);

//ques 2
const users = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 20 },
  { name: "Charlie", age: 17 },
  { name: "David", age: 22 }
];

const adults = users.filter((user) => user.age > 18);

console.log(adults);

//ques 3
const words = ["hello", "world", "JavaScript", "is", "fun"];

const stringLonger = words.filter((word) => word.length > 5);

console.log(stringLonger);
*/

//challenging questions
//ques 2
/*
const numbers = [2, 3, 4, 5, 6, 7, 8];

const oddNum = numbers.filter((num) => num % 2 !== 0);

const doubled = oddNum.map((num) => num * 2);

const first = doubled.find((num) => num > 10);
console.log(first);
*/

/*
const result = numbers
 .filter((num) => num % 2 === 0)
 .map((num) => num * 2)
 .find((num) => num > 10);

console.log(result);

const result = numbers
  .filter((num) => num % 2 === 0)  // No semicolon here
  .map((num) => num * 2)          // No semicolon here
  .find((num) => num > 10);       // No semicolon here (optional after the last method)

console.log(result);


const users = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 20 },
  { name: "Charlie", age: 17 },
  { name: "David", age: 22 }
];

const filtered = users.find((user) => user.name === "Bob");

if(filtered) {
  filtered.age = 25

  console.log(filtered);
};

const products = [
  { name: "Smartphone", price: 799, category: "Electronics" },
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Shoes", price: 50, category: "Fashion" },
  { name: "Headphones", price: 150, category: "Electronics" }
];

//find the product with the name "Laptop" and update its price to a discounted price of $500. Log the updated product object.
const lap = products.find((product) => product.name === "Laptop");

const discountedPrice = 500;

if(lap) {
  lap.price = discountedPrice;

  console.log(products);
}
*/
/*

//ques 1
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, curr) => {
  return acc + curr;
})

console.log(sum);
*/

/*
//ques 2
const numbers = [3, 7, 2, 9, 4, 100];
// Output: 9

const largest = numbers.reduce((acc, curr) => {
  return Math.max(acc , curr)
})

console.log(largest);
*/





/*
//ques 4
const strings = ['apple', 'banana', 'cherry'];

const total = strings.reduce((acc, curr) => {
  return acc + curr.length;
}, 1); // Start with an initial value of 0

console.log(total);


const people = [
  { name: 'Alice', age: 25, quantity: 10},
  { name: 'Bob', age: 30, quantity: 10 },
  { name: 'Charlie', age: 35, quantity: 10 }
];

const totalAge = people.reduce((acc,person) => {
  return acc + person.quantity;
},0)

console.log(totalAge);


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNum = numbers.reduce((acc,num) => {
  return acc + (num % 2 === 0 ? 1 : 0);
})

console.log(evenNum);


const words = ['apple', 'banana', 'cherry'];
const wordLength = words.reduce((acc,word) => {
  acc[word] = word.length;
  return acc;
}, {});

console.log(wordLength);


const numbers = [1, 2, 3, 4];

const productNum = numbers.reduce((acc,num) => {
  return acc * num;
})

console.log(productNum);



const people = [
  { name: 'Alice', salary: 5000 },
  { name: 'Bob', salary: 6000 },
  { name: 'Charlie', salary: 7000 }
];

const totalSalary = people.reduce((acc,person) => {
  return acc + person.salary;
},0);

console.log(totalSalary);
*/

/*
const words = ['cat', 'elephant', 'dog', 'hippopotamus'];
const longestString = words.reduce((acc,curr) => {
  return curr.length > acc.length ? acc : curr;
}, '')
console.log(longestString);


const words = ['cat', 'elephant', 'dog', 'hippopotamus'];

const longestWord = words.reduce((acc, curr) => {
  return curr.length > acc.length ? curr : acc; // If the current word is longer, set it as the new longest word
}, ''); // Start with an empty string as the initial value

console.log(longestWord);
*/

//assignment 1\
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];

const adult = users.find((person) => person.age > 18);

console.log(adult)

//assignment 2
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNum = numbers.filter((num) => num % 2 === 0);

console.log(evenNum);

/*
//assignment 3
const words = ['apple', 'banana', 'cherry'];

const totalChar = words.reduce((acc,curr) => {
  acc + curr.length;
  return acc;
},0)

console.log(totalChar);
*/
const words = ['apple', 'banana', 'cherry'];

// Use reduce to calculate the total number of characters
const totalCharacters = words.reduce((acc, curr) => {
  return acc + curr.length;
}, 0); // Start with 0 as the initial accumulator value

console.log(totalCharacters);
