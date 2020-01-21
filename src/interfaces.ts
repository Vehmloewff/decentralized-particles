export interface Particle {}
export interface ParticleOptions {
	size?: RangeValue;
	background?: string | string[];
}
export interface ConfigOptions {
	movement?: 0.003; // Movements per ms
	easing?: EaseLikeFunction;
	particlesCount?: RangeValue;
	nextFrameCaller?: (fn: () => Promise<void> | void) => void;
}

export type EaseLikeFunction = (n: number) => number;
export interface RangeValue {
	min?: number;
	max?: number;
}

export type UpdateHook = (updatedProperties: Particle) => void | Promise<void>;
export interface ParticleHooks {
	update: UpdateHook;
}
export type ParticleCreator = (
	properties: Particle,
	hooks: ParticleHooks
) => Promise<void> | void | (() => void) | Promise<() => void>;
