const { paths } = require('react-app-rewired');
// load environment variables from .env files
// before overrides scripts are read
require(paths.scriptVersion + '/config/env');
const override = require('react-app-rewired/config-overrides');
const config = require(paths.scriptVersion + '/config/webpack.config.dev');

if (override.devserver) {
    console.log(
        'Warning: `devserver` has been deprecated. Please use `devServer` instead as ' +
        '`devserver` will not be used in the next major release.'
    )
}

module.exports = override.webpack(config, process.env.NODE_ENV);
