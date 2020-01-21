export type EaseLikeFunction = (n: number) => number;
export type AnyFunction = () => Promise<void> | void;
export interface RangeValue {
	min?: number;
	max?: number;
}
