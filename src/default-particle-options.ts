import { ParticleOptions } from './particle';

const defaultParticleOptions: ParticleOptions = {
	size: {
		max: 10,
		min: 9,
	},
	background: `#ddd`,
	lifespan: {
		max: 400,
		min: 300,
	},
	speed: {
		min: 0.0005,
		max: 0.0009,
	},
	keepAround: false,
};

export default defaultParticleOptions;
