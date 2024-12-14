// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Modify the Webpack configuration to add the alias
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };

  // Return the updated Webpack config
  return config;
};
