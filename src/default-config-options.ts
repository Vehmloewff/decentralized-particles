import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 200,
		min: 150,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 16);
	},
	segments: true,
};

export default defaultConfig;
