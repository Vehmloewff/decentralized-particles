import { ConfigOptions } from './interfaces';

const defaultConfig: ConfigOptions = {
	particlesCount: {
		max: 230,
		min: 200,
	},
	nextFrameCaller: fn => {
		setTimeout(fn, 16);
	},
	segments: true,
	segmentStrength: 0.11,
};

export default defaultConfig;
