/* eslint-disable */
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [
  /**
  * Client
  */
  {
    entry: './src/client/index.js',
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/public'
    },
    resolve: {
      /**
      * Allows us to do stuff like `import thing from 'app/thing'`, which would
      * import from `/src/client/app/thing`
      */
      modules: ['node_modules', './src/client'],
      /**
      * Overriding the default to allow jsx to be resolved automatically.
      */
      extensions: ['.js', '.json', '.jsx'],
      /**
      * Access config from anywhere via `import settings from 'settings'``
      */
      alias: {
        settings: path.resolve(__dirname, './settings.js'),
        '~': path.resolve(__dirname, './src/client')        
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            plugins: ['@babel/plugin-proposal-class-properties'],
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow']
          }
        }
      ]
    }
  },
  /**
  * Server
  *
  * This is used purely as a way to run the server code through babel, and not to bundle any
  * external dependencies.
  */
  {
    entry: './src/server/index.js',
    /**
    * XXX For some reasn source maps only work correctly in node debugger when using inline
    * source map.
    */
    devtool: 'inline-source-map',
    /**
    * Ignore built-in node modules like path, fs, etc.
    */
    target: 'node',
    /**
    * Webpack causes __dirname and __filename to return undefined. This fixes it.
    * info: https://github.com/webpack/webpack/issues/1599
    */
    node: {
      __dirname: false,
      __filename: false
    },
    /**
    * Ignore anything in node_modules
    */
    externals: [nodeExternals()],
    output: {
      filename: './server.js'
    },
    resolve: {
      modules: ['./src/server'],
      /**
      * Access config from anywhere via `import settings from 'settings'``
      */
      alias: {
        settings: path.resolve(__dirname, './settings.js'),
        '~': path.resolve(__dirname, './src/server')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-flow']
          }
        }
      ]
    }
  }
]
