const debug = require('debug');
const chalk = require('chalk');
const appName = `TODO-change-this`;

/**
 * @param {String?} job The job that is logging
 */
module.exports = (job: string) => {
	const log = debug(`${appName}:${job}`);

	function error(message: string) {
		log(chalk.black.bgRed('ERROR:'), message);
	}

	function warn(message: string) {
		log(chalk.black.bgYellow('WARN:'), message);
	}

	function notice(message: string) {
		log(chalk.black.bgCyan('NOTICE:'), message);
	}

	function info(message: string) {
		log(chalk.black.bgGreen('INFO:'), message);
	}

	return {
		error,
		warn,
		notice,
		info,
	};
};
