export function getRndInteger(min: number, max: number) {
	if (min > max) throw new Error(`'min' must be less than 'max'`);

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

export function getRightTriangleSides(hypotenuse: number, theta: number) {
	return {
		opposite: Math.sin(theta) * hypotenuse,
		adjacent: Math.cos(theta) * hypotenuse,
	};
}
