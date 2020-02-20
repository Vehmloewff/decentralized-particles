import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';

const sourcemap = true;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const browserTest = process.env.TEST_TYPE === 'browser';
const unitTest = process.env.TEST_TYPE === 'unit';

const sharedOutputOptions = {
	sourcemap,
};

const output = [];

if (!browserTest) output.push({ file: pkg.main, format: 'cjs', ...sharedOutputOptions });
if (prod && !browserTest) output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });
if (prod || browserTest)
	output.push({ file: browserTest ? `./browser-test/build.js` : `dist/build.iife.js`, format: `iife`, name: `DParticles` });

export default {
	input: prod ? 'src/index.ts' : '@tests',
	output,
	plugins: [
		!prod &&
			globFiles({
				key: `@tests`,
				include: unitTest ? `./tests/unit/**/*.ts` : `./tests/**/*.ts`,
				justImport: true,
			}),
		resolve(),
		commonjs(),
		!prod && command(`node ${pkg.main}`, { exitOnFail: !watching }),
		browserTest && command(`./node_modules/.bin/serve browser-test`),
		typescript({
			typescript: require('typescript'),
		}),
	],
};
