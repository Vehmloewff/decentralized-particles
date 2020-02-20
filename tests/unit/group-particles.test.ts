import { describe } from 'zip-tap';
import { Particle } from '../../src/particle';
import groupParticles from '../../src/group-particles';

describe(`group-particles`, it => {
	it(`should group the particles`, expect => {
		const particles = [
			new Particle({
				startPositionX: 0.5,
				startPositionY: 0.5,
			}),
			new Particle({
				startPositionX: 0.5,
				startPositionY: 0.4,
			}),
			new Particle({
				startPositionX: 0.4,
				startPositionY: 0.5,
			}),
			new Particle({
				startPositionX: 0.3,
				startPositionY: 0.3,
			}),
			new Particle({
				startPositionX: 0.2,
				startPositionY: 0.3,
			}),
			new Particle({
				startPositionX: 0.3,
				startPositionY: 0.4,
			}),
		];

		const groups = [
			[particles[0], particles[1]],
			[particles[0], particles[2]],
			[particles[1], particles[2]],
			[particles[1], particles[5]],
			[particles[2], particles[5]],
			[particles[3], particles[4]],
			[particles[3], particles[5]],
			[particles[4], particles[5]],
		];

		const actual = groupParticles(particles, 0.2);

		expect(actual).toMatchObject(groups);
	});
});
