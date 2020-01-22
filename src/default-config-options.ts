import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 10,
		min: 5,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 200);
	},
};

export default defaultConfig;
