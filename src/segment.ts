import { Particle } from './particle';
import { RangeValue, AnyFunction } from './background-interfaces';
import { chooseOption, getRndInteger, randomString } from './utils';
import deepMerge from 'deepmerge';
import defaultSegmentOptions from './default-segment-options';

export interface SegmentOptions {
	stroke?: string[] | string;
	width?: RangeValue;
}

export class Segment {
	options: SegmentOptions;
	startParticle: Particle;
	endParticle: Particle;
	stroke: string;
	width: number;
	id: string;

	positionX1: number;
	positionX2: number;
	positionY1: number;
	positionY2: number;

	private callOnUpdate: AnyFunction[] = [];
	private callOnDestroy: AnyFunction[] = [];

	constructor(startParticle: Particle, endParticle: Particle, options?: SegmentOptions) {
		const errBase = `The first param to 'Segment' `;
		if (!(startParticle instanceof Particle && endParticle instanceof Particle))
			throw new Error(errBase + `must be of type '[Particle, Particle]'`);

		this.options = deepMerge(defaultSegmentOptions, options || {});
		this.startParticle = startParticle;
		this.endParticle = endParticle;

		this.stroke = chooseOption(this.options.stroke);
		this.width = getRndInteger(this.options.width.min, this.options.width.max);

		this.id = randomString(20);

		this.startParticle.onDestroy(() => this.destroy());
		this.endParticle.onDestroy(() => this.destroy());
	}

	triggerUpdate() {
		this.positionX1 = this.startParticle.positionX;
		this.positionX2 = this.endParticle.positionX;
		this.positionY1 = this.startParticle.positionY;
		this.positionY2 = this.endParticle.positionY;

		this.callOnUpdate.forEach(fn => fn());
	}
	destroy() {
		this.callOnDestroy.forEach(fn => fn());
	}

	onUpdate(fn: AnyFunction) {
		this.callOnUpdate.push(fn);
	}
	onDestroy(fn: AnyFunction) {
		this.callOnDestroy.push(fn);
	}
}
