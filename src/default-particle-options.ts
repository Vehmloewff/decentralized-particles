import { ParticleOptions } from './particle';

const defaultParticleOptions: ParticleOptions = {
	size: {
		max: 5,
		min: 3,
	},
	background: `#777`,
	lifespan: {
		max: 5000,
		min: 4900,
	},
	speed: {
		min: 0.0003,
		max: 0.0004,
	},
	keepAround: false,
};

export default defaultParticleOptions;
