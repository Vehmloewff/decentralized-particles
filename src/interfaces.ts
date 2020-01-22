import { Particle } from './particle';
import { RangeValue } from './background-interfaces';

export interface ConfigOptions {
	particlesCount?: RangeValue;
	nextFrameCaller?: (fn: () => Promise<void> | void) => void;
}

export type UpdateHook = (updatedProperties: Particle) => void | Promise<void>;
export interface ParticleHooks {
	update: UpdateHook;
}
export type ParticleCreator = (particle: Particle) => Promise<void> | void | (() => void) | Promise<() => void>;
