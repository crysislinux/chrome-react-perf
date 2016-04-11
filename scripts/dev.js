/* eslint-disable */
const tasks = require('./tasks');

console.log('[Copy assets]');
console.log('--------------------------------');
tasks.copyAssets('dev');

console.log('[Webpack Dev]');
console.log('--------------------------------');
console.log('load unpacked extensions with `./dev` folder.  (see https://developer.chrome.com/extensions/getstarted#unpacked)\n');
// exec('webpack-dev-server --config=webpack.config.dev.js --no-info --hot --inline --colors');
exec('node server.js');
