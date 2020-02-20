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
	segmentStrength: 0.05,
};

export default defaultConfig;
