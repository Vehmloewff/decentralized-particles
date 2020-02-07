import { Particle } from './particle';
import { RangeValue } from './background-interfaces';

export interface SegmentOptions {
	stroke?: string;
	width?: RangeValue;
	strength?: number; // between 0 and 1
}

export class Segment {
	options: SegmentOptions;
	startParticle: Particle;
	endParticle: Particle;

	constructor(startParticle: Particle, endParticle: Particle, options?: SegmentOptions) {
		const errBase = `The first param to 'Segment' `;
		if (!(startParticle instanceof Particle && endParticle instanceof Particle))
			throw new Error(errBase + `must be of type '[Particle, Particle]'`);

		this.options = options;
		this.startParticle = startParticle;
		this.endParticle = endParticle;
	}
}
