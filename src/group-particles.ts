import { Particle } from './particle';

function loopFromIndex<T>(array: T[], startIndex: number, cb: (val: T, index: number) => void) {
	for (let x = startIndex; x < array.length; x++) {
		cb(array[x], x);
	}
}

function makePositive(n: number): number {
	if (n < 0) return n * -1;
	return n;
}

function hypotenuse(n1: number, n2: number) {
	return Math.sqrt(n1 * n1 + n2 * n2);
}

function getDistanceBetween(particle1: Particle, particle2: Particle): number {
	const distanceX = makePositive(particle1.positionX - particle2.positionX);
	const distanceY = makePositive(particle1.positionY - particle2.positionY);

	return hypotenuse(distanceX, distanceY);
}

export default (particles: Particle[], strength: number): [Particle, Particle][] => {
	const result: [Particle, Particle][] = [];

	particles.forEach((particle, index) => {
		loopFromIndex(particles, index + 1, proposition => {
			const distanceBetween = getDistanceBetween(particle, proposition);

			if (distanceBetween <= strength) result.push([particle, proposition]);
		});
	});

	return result;
};
