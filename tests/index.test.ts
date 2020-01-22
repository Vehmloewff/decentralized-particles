import { DecentralizedParticles } from '../src';
import { describe } from 'zip-tap';

describe(`sayHello`, it => {
	it(`sayHello should return a gretting`, expect => {
		const particles = new DecentralizedParticles();
		particles.start();

		setTimeout(() => {
			particles.pause();
		}, 20000);
	});
});
