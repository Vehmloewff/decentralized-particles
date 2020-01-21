import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	movement: 0.003,
	easing: () => 6,
	particlesCount: {
		max: 1000,
		min: 800,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 100);
	},
};

export default defaultConfig;
