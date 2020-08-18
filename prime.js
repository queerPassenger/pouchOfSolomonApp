require('dotenv').config();
const { exec, spawn } = require('child_process');

/* exec
const execCommand = process.argv.slice(2).join(' ');
const execProcess = exec(execCommand);
execProcess.stdout.pipe(process.stdout);
execProcess.stderr.pipe(process.stderr);
execProcess.stdin.pipe(process.stdin);
*/
const rootCommand = process.argv[2];
const argumentCommands = process.argv.slice(3);
spawn(rootCommand, argumentCommands,
    { stdio: [process.stdin, process.stdout, process.stderr] });

