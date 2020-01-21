import { Particle } from './particle';
import { EaseLikeFunction, RangeValue } from './background-interfaces';

export interface ConfigOptions {
	movement?: 0.003; // Movements per ms
	easing?: EaseLikeFunction;
	particlesCount?: RangeValue;
	nextFrameCaller?: (fn: () => Promise<void> | void) => void;
}

export type UpdateHook = (updatedProperties: Particle) => void | Promise<void>;
export interface ParticleHooks {
	update: UpdateHook;
}
export type ParticleCreator = (particle: Particle) => Promise<void> | void | (() => void) | Promise<() => void>;
