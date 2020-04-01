// Since organize-imports-cli doesn't let you lint directories/use globs unless
// you have a tsconfig.json file, this is a solution made to automate organizing
// imports.
const glob = require('glob');
const path = require('path');
const { exec } = require('child_process');
const match = process.argv[3] || '!(node_modules)/**/*.js';
const cmd = 'organize-imports-cli';

glob.sync(match).forEach((file) =>
	exec(
		`${path.join(__dirname, 'node_modules/.bin', cmd)} ${file}`,
		(err, stdout) => {
			if (err) {
				throw err;
			}
			process.stdout.write(stdout);
		},
	),
);
