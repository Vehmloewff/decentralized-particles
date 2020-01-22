export function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const nums = `1234567890`.split('');
const letters = `abcdefghijklmnopqrstuvwxyz`;
const specialChars = `-`.split('');
const lowerCaseLetters = letters.split('');
const upperCaseLetters = letters.toUpperCase().split('');

const choices = nums.concat(lowerCaseLetters, upperCaseLetters, specialChars);

export function randomString(length: number, prefix: string = ``) {
	if (length < prefix.length) throw new Error(`'length' must not be less than the length of the prefix!`);

	const getChar = () => choices[Math.floor(Math.random() * choices.length)];

	let chars = ``;
	for (let cur = 0; cur < length - prefix.length; cur++) {
		chars += getChar();
	}

	return prefix + chars;
}

export function hypotenuse(x: number, y: number): number {
	return Math.sqrt(x * x + y * y);
}

export function buildSidesFromHypotenuse(x: number, y: number, expected: number) {
	return Math.sqrt(0.5 * expected * expected);
}
