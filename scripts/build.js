/* eslint-disable */
const tasks = require('./tasks');

console.log('[Copy assets]');
console.log('--------------------------------');
tasks.copyAssets('build');

console.log('[Webpack Build]');
console.log('--------------------------------');
exec('webpack --config webpack.config.prod.js --progress --profile --colors');
