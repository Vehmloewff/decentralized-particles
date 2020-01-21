import { RangeValue, AnyFunction } from './background-interfaces';

export interface ParticleOptions {
	size?: RangeValue;
	background?: string | string[];
}

export class Particle {
	id: string;

	constructor(options: ParticleOptions) {}

	triggerUpdate() {}

	onDestroy(fn: AnyFunction) {}
}
