// 
// Object Destructuring
//

// const person = {
// 	name: "Andrew",
// 	age: "26",
// 	location: {
// 		city: "Philadelphia",
// 		temperature: 92
// 	}
// };

// const { name: firstName = 'Anonymous', age} = person; 

// console.log(`${firstName} is ${age}`);

// const {city, temperature: temp} = person.location;
// if (city && temp) {
// 	console.log(`It's ${temp} in ${city}.`);	
// }

const book = {
	title: 'Ego is the Enemy',
	author: 'Ryan Holiday',
	publisher: {
		name: 'Penguin'
	}
};

const {name: publisherName = 'Self Published'} = book.publisher;
console.log(publisherName); 

//
// Array Destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, city, state = 'New York'] = address;
console.log(`You are in ${city} ${state}.`);

const items = ['coffee (hot)','$2.00', '$2.50', '$2.75'];
const [item, , medium ] = items;

console.log(`A medium ${item} costs ${medium}`);