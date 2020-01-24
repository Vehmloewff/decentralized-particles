import { ParticleOptions } from './particle';

const defaultParticleOptions: ParticleOptions = {
	size: {
		max: 7,
		min: 3,
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
};

export default defaultParticleOptions;
