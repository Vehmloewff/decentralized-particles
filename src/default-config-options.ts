import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 5,
		min: 3,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 200);
	},
};

export default defaultConfig;
