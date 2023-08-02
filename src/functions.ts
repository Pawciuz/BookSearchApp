function add(n1: number, n2: number): void {
	console.log(n1 + n2)
}
add(1, 2)
let combineValues: (a: number, b: number) => void
combineValues = add
combineValues(1, 2)

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2
	cb(result)
}
addAndHandle(10, 20, (result) => {
	console.log(result)
})
