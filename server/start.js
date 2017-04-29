/**
 * Created by leekoho on 2017/4/24.
 */
require("babel-core/register")({
  presets: ['es2015', 'stage-2']
});
require("babel-polyfill");

module.exports = require('./app.js');
