import { Particle } from './particle';
import { RangeValue } from './background-interfaces';
import { Segment } from './segment';

export interface ConfigOptions {
	particlesCount?: RangeValue;
	nextFrameCaller?: (fn: () => Promise<void> | void) => void;
	segments?: boolean;
	segmentStrength?: number; // between 0 and 1
}

export type UpdateHook = (updatedProperties: Particle) => void | Promise<void>;
export interface ParticleHooks {
	update: UpdateHook;
}
export type ParticleCreator = (particle: Particle) => Promise<void> | void | (() => void) | Promise<() => void>;
export type SegmentCreator = (segment: Segment) => Promise<void> | void | (() => void) | Promise<() => void>;
