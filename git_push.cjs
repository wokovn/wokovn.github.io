const { execSync } = require('child_process');
const cwd = 'c:/Users/minhthu/Downloads/CV_Update/wokovn.github.io';
execSync('git add -A', { cwd, stdio: 'inherit' });
execSync('git commit -m "refactor: modularize NeobrutalSystems, compact 2-col sticky layout, and fix mobile responsiveness"', { cwd, stdio: 'inherit' });
execSync('git push origin main', { cwd, stdio: 'inherit' });
console.log('Push complete!');
