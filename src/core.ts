import { ParticleOptions, ConfigOptions, ParticleCreator, Particle } from './interfaces';
import deepMerge from 'deepmerge';

type MaybePromiseFunction = () => void | Promise<void>;

export default class {
	options: ParticleOptions = {
		size: {
			max: 10,
			min: 7,
		},
		background: `#DDD`,
	};
	config: ConfigOptions = {
		movement: 0.003,
		easing: () => 6,
		particlesCount: {
			max: 1000,
			min: 800,
		},
	};
	nextFrameCaller: (fn: MaybePromiseFunction) => void = () => {};

	// StateObject
	private currentState: Particle[] = [];

	// Hooks
	particleCreator: ParticleCreator = () => {};
	callBeforeUpdate: MaybePromiseFunction[] = [];
	callAfterUpdate: MaybePromiseFunction[] = [];

	// Options
	constructor(configOptions: ConfigOptions, particleOptions: ParticleOptions) {
		this.setOptions(configOptions, particleOptions);
	}
	setOptions(configOptions: ConfigOptions, particleOptions: ParticleOptions) {
		this.config = deepMerge(this.config, configOptions);
		this.options = deepMerge(this.options, particleOptions);

		this.nextFrameCaller = configOptions.nextFrameCaller || requestAnimationFrame;
	}

	// Event handlers
	createParticle(fn: ParticleCreator) {
		this.particleCreator = fn;
	}
	beforeUpdate(fn: MaybePromiseFunction) {
		this.callBeforeUpdate.push(fn);
	}
	afterUpdate(fn: MaybePromiseFunction) {
		this.callAfterUpdate.push(fn);
	}

	// Controls
	start() {
		this.currentState = this.createIntialState();

		this.currentState.forEach(particle => {
			this.particleCreator(particle);
		});
	}
	pause() {}
	play() {}

	// Behind the scenes
	private createIntialState(): Particle[] {
		return;
	}
	private updateState(oldState: Particle[]): Particle[] {
		return;
	}
}
