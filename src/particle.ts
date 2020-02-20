import { RangeValue, AnyFunction } from './background-interfaces';
import { randomString, getRndInteger, getRightTriangleSides, chooseOption } from './utils';
import deepMerge from 'deepmerge';
import defaultParticleOptions from './default-particle-options';

export interface ParticleOptions {
	size?: RangeValue;
	background?: string | string[];
	lifespan?: RangeValue; // Units are in updates
	speed?: RangeValue; // Movements per update
	keepAround?: boolean;
	startPositionX?: number;
	startPositionY?: number;
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
	private addToExistingMultiplierX: number = Math.random() > 0.5 ? 1 : -1;
	private addToExistingMultiplierY: number = Math.random() > 0.5 ? 1 : -1;

	constructor(options?: ParticleOptions) {
		this.options = deepMerge(defaultParticleOptions, options || {});

		this.id = randomString(20);
		this.positionX = options.startPositionX || Math.random();
		this.positionY = options.startPositionY || Math.random();
		this.initialPositionX = this.positionX;
		this.initialPositionY = this.positionY;

		this.age = 0;

		this.lifespan = getRndInteger(this.options.lifespan.min, this.options.lifespan.max);
		this.size = getRndInteger(this.options.size.min, this.options.size.max);
		this.speed = getRndInteger(this.options.speed.min, this.options.speed.max);

		this.background = chooseOption(this.options.background);

		this.setDestination();
	}

	triggerUpdate() {
		this.age++;

		if (this.age > this.lifespan) {
			if (!this.options.keepAround) return this.destroy();

			// Reset Position
			this.initialPositionX = this.positionX;
			this.initialPositionY = this.positionY;

			// Reset age
			this.age = 0;
			this.lifespan = getRndInteger(this.options.lifespan.min, this.options.lifespan.max);
			this.speed = getRndInteger(this.options.speed.min, this.options.speed.max);

			// Reset destination
			this.setDestination();
		}

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

		this.finalPositionX = addToExisting(this.positionX, adjacent, this.addToExistingMultiplierX);
		this.finalPositionY = addToExisting(this.positionY, opposite, this.addToExistingMultiplierY);

		function addToExisting(pos: number, extra: number, multiplyer: number): number {
			return pos + extra * multiplyer;
		}
	}

	private getNextPosition(start: number, finish: number): number {
		if (start === finish) return start;

		const difference = finish - start;
		const step = difference / this.lifespan;

		return start + step * this.age;
	}
}
