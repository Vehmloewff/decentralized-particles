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

const sharedOutputOptions = {
	name,
	sourcemap,
};

const output = [{ file: pkg.main, format: 'cjs', ...sharedOutputOptions }];

if (prod) output.push({ file: pkg.module, format: 'es', ...sharedOutputOptions });

export default {
	input: prod ? 'src/index.ts' : 'globbed-tests.ts',
	output,
	plugins: [
		globFiles({
			file: `globbed-tests.ts`,
			include: `./tests/**/*.ts`,
			justImport: true,
		}),
		resolve(),
		commonjs(),
		!prod && command(`node ${pkg.main} | zip-tap-reporter`, { exitOnFail: !watching }),
		typescript({
			typescript: require('typescript'),
		}),
	],
};
