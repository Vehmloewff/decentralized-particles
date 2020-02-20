import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 50,
		min: 30,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 16);
	},
	segments: true,
	segmentStrength: 0.254,
};

export default defaultConfig;
