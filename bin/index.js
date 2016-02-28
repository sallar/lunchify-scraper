const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));

// Babel require hook
require('babel-register')(config);

require('babel-polyfill');

// Start the app
require('index');