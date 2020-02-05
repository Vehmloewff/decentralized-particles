import { RangeValue, AnyFunction } from './background-interfaces';
import { randomString, getRndInteger, getRightTriangleSides } from './utils';
import deepMerge from 'deepmerge';
import defaultParticleOptions from './default-particle-options';

export interface ParticleOptions {
	size?: RangeValue;
	background?: string | string[];
	lifespan?: RangeValue; // Units are in updates
	speed?: RangeValue; // Movements per update
	keepAround?: boolean;
}

export class Particle {
	options: ParticleOptions;
	size: number;
	background: string;
	lifespan: number;
	speed: number;
	id: string;

	age: number;
	positionX: number;
	positionY: number;

	initialPositionX: number;
	initialPositionY: number;

	finalPositionX: number;
	finalPositionY: number;

	private callOnDestroy: AnyFunction[] = [];
	private callOnUpdate: AnyFunction[] = [];

	constructor(options?: ParticleOptions) {
		this.options = deepMerge(defaultParticleOptions, options || {});

		this.id = randomString(20);
		this.positionX = Math.random();
		this.positionY = Math.random();
		this.initialPositionX = this.positionX;
		this.initialPositionY = this.positionY;

		this.age = 0;

		this.lifespan = getRndInteger(this.options.lifespan.min, this.options.lifespan.max);
		this.size = getRndInteger(this.options.size.min, this.options.size.max);
		this.speed = getRndInteger(this.options.speed.min, this.options.speed.max);

		if (Array.isArray(this.options.background)) {
			if (!this.options.background.length) throw new Error(`'options.background' cannot be an empty array.`);
			this.background = this.options.background[getRndInteger(0, this.options.background.length - 1)];
		} else this.background = this.options.background;

		this.setDestination();
	}

	triggerUpdate() {
		this.age++;

		if (this.age > this.lifespan) return this.destroy();

		this.positionX = this.getNextPosition(this.initialPositionX, this.finalPositionX);
		this.positionY = this.getNextPosition(this.initialPositionY, this.finalPositionY);

		if (this.positionX > 1 || this.positionX < 0 || this.positionY > 1 || this.positionY < 0) return this.destroy();

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

	private setDestination() {
		const hypotenuse = this.lifespan * this.speed;
		const angle = getRndInteger(0, 90);
		const { adjacent, opposite } = getRightTriangleSides(hypotenuse, angle);

		this.finalPositionX = addToExisting(this.positionX, adjacent);
		this.finalPositionY = addToExisting(this.positionY, opposite);

		function addToExisting(pos: number, extra: number): number {
			if (Math.random() > 0.5) return pos + extra;
			else return pos - extra;
		}
	}

	private getNextPosition(start: number, finish: number): number {
		if (start === finish) return start;

		const difference = finish - start;
		const step = difference / this.lifespan;

		return start + step * this.age;
	}
}
