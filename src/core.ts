import { ConfigOptions, ParticleCreator } from './interfaces';
import deepMerge from 'deepmerge';
import { Particle, ParticleOptions } from './particle';
import defaultConfigOptions from './default-config-options';
import { getRndInteger } from './utils';
import defaultParticleOptions from './default-particle-options';

type MaybePromiseFunction = () => void | Promise<void>;

export class DecentralizedParticles {
	config: ConfigOptions;
	particleOptions: ParticleOptions;

	private currentState: Map<string, Particle>;
	private particleCreator: ParticleCreator;
	private callBeforeUpdate: MaybePromiseFunction[] = [];
	private callAfterUpdate: MaybePromiseFunction[] = [];

	constructor(configOptions?: ConfigOptions, particleOptions?: ParticleOptions) {
		this.config = deepMerge(this.config || defaultConfigOptions, configOptions || {});
		this.particleOptions = particleOptions;

		this.particleCreator = () => {};
	}

	createParticle(fn: ParticleCreator) {
		this.particleCreator = fn;
	}
	beforeUpdate(fn: MaybePromiseFunction) {
		this.callBeforeUpdate.push(fn);
	}
	afterUpdate(fn: MaybePromiseFunction) {
		this.callAfterUpdate.push(fn);
	}

	start() {
		this.currentState = this.createState();

		this.currentState.forEach(particle => {
			this.initParticle(particle);
			this.listenForDestroy(particle);
		});

		this.triggerNextFrame();
	}

	pause() {
		const currentFrameCaller = this.config.nextFrameCaller;

		this.config.nextFrameCaller = () => {};

		return () => (this.config.nextFrameCaller = currentFrameCaller);
	}

	private triggerNextFrame() {
		this.config.nextFrameCaller(() => this.nextFrame());
	}

	private nextFrame() {
		this.callBeforeUpdate.forEach(fn => fn());

		this.currentState.forEach(particle => {
			particle.triggerUpdate();
		});

		this.callAfterUpdate.forEach(fn => fn());

		this.triggerNextFrame();
	}

	private initParticle(particle: Particle) {
		this.particleCreator(particle);
	}

	private listenForDestroy(particle: Particle) {
		particle.onDestroy(() => {
			this.currentState.delete(particle.id);

			this.createReplacementParticles();
		});
	}

	private createReplacementParticles() {
		let newAmountOfParticles: number;

		const { max, min } = this.config.particlesCount;
		const count = this.currentState.size;

		if (max - min >= 5) {
			if (count >= max) newAmountOfParticles = 0;
			else if (count <= min) newAmountOfParticles = 2;
			else newAmountOfParticles = getRndInteger(0, 2);
		} else newAmountOfParticles = 1;

		for (let index = 0; index < newAmountOfParticles; index++) {
			const particle = new Particle(this.particleOptions);

			this.initParticle(particle);
			this.listenForDestroy(particle);

			this.currentState.set(particle.id, particle);
		}
	}

	private createState(): Map<string, Particle> {
		const particleCount = getRndInteger(this.config.particlesCount.min, this.config.particlesCount.max);

		const particles: Map<string, Particle> = new Map();

		for (let index = 0; index < particleCount; index++) {
			const particle = new Particle(this.makeMinMoreRandom(this.particleOptions));

			particles.set(particle.id, particle);
		}

		return particles;
	}

	private makeMinMoreRandom(options: ParticleOptions): ParticleOptions {
		if (!options) options = {};
		if (!options.lifespan) options.lifespan = {};

		const oldVal = options.lifespan.min || defaultParticleOptions.lifespan.min;
		options.lifespan.min = getRndInteger(0, oldVal);

		return options;
	}
}
