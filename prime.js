require('dotenv').config();
const { exec } = require('child_process');
const execCommand = process.argv.slice(2).join(' ');
const execProcess = exec(execCommand);
execProcess.stdout.pipe(process.stdout);
execProcess.stderr.pipe(process.stderr);