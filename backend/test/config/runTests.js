const { spawn } = require('child_process');

const testFiles = ['Artist.test.js', 'Song.test.js', 'User.test.js'];
const basePort = 8001;

testFiles.forEach((file, index) => {
  const port = basePort + index;
  const testRunner = spawn('pnpm', ['jest', file], {
    stdio: 'inherit',
    env: { ...process.env, PORT: port },
  });

  testRunner.on('exit', (code) => {
    console.log(`Test file ${file} exited with code ${code}`);
  });
});
