import { ConfigOptions, ParticleCreator } from './interfaces';
import deepMerge from 'deepmerge';
import { Particle, ParticleOptions } from './particle';
import defaultConfigOptions from './default-config-options';
import { getRndInteger } from './utils';

type MaybePromiseFunction = () => void | Promise<void>;

export class DecentralizedParticles {
	config: ConfigOptions;
	particleOptions: ParticleOptions;

	private currentState: Map<string, Particle>;
	private particleCreator: ParticleCreator;
	private callBeforeUpdate: MaybePromiseFunction[] = [];
	private callAfterUpdate: MaybePromiseFunction[] = [];

	constructor(configOptions: ConfigOptions, particleOptions: ParticleOptions) {
		this.config = deepMerge(this.config || defaultConfigOptions, configOptions);
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
		this.config.nextFrameCaller(this.nextFrame);
	}

	private nextFrame() {
		this.currentState.forEach(particle => {
			particle.triggerUpdate();
		});
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
		let newAmountOfParticles = getRndInteger(0, 3);

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
			const particle = new Particle(this.particleOptions);

			particles.set(particle.id, particle);
		}

		return particles;
	}
}
