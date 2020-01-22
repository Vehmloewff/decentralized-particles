import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 400,
		min: 300,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 200);
	},
};

export default defaultConfig;
