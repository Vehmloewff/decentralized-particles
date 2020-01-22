import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import command from 'rollup-plugin-command';
import typescript from 'rollup-plugin-typescript';
import globFiles from 'rollup-plugin-glob-files';

const name = 'todo';
const sourcemap = true;
const prod = process.env.NODE_ENV === 'production';
const watching = process.env.ROLLUP_WATCH;
const browserTest = process.env.BROWSER_TEST;

const sharedOutputOptions = {
	name,
	sourcemap,
};

const output = [];

if (!browserTest) output.push({ file: pkg.main, format: 'cjs', ...sharedOutputOptions });
if (prod && !browserTest) output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });
if (browserTest) output.push({ file: `./browser-test/build.js`, format: `iife`, name: `DParticles` });

export default {
	input: prod ? 'src/index.ts' : '@tests',
	output,
	plugins: [
		!prod &&
			globFiles({
				key: `@tests`,
				include: `./tests/**/*.ts`,
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
