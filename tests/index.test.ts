import { DecentralizedParticles } from '../src';
import { describe } from 'zip-tap';

describe(`sayHello`, async it => {
	await it(`sayHello should return a gretting`, () => {
		return new Promise(resolve => {
			const particles = new DecentralizedParticles();
			particles.start();

			setTimeout(() => {
				particles.pause();
				resolve();
			}, 20000);
		});
	});
});
