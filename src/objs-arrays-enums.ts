// const person: {
// 	name: string
// 	age: number
// 	hobbies: string[]
// 	role: [number, string]
// } = {
// 	name: "Maximilian",
// 	age: 30,
// 	hobbies: ["sports", "cooking"],
// 	role: [2, "author"],
// }
enum Role {
	ADMIN = 5,
	READ_ONLY,
	AUTHOR,
}

const person = {
	name: "Maximilian",
	age: 30,
	hobbies: ["sports", "cooking"],
	role: Role.ADMIN,
}
console.log(person.name)
for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase())
}
console.log(person.role)
