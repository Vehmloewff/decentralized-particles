import { sayHello } from '../src';
import { describe } from 'zip-tap';

describe(`sayHello`, it => {
	it(`sayHello should return a gretting`, expect => {
		expect(sayHello(`Elijah`)).toMatch(/hello.*Elijah/i);
	});
});
