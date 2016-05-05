'use strict';

var util = require('../util');
var MusicDataMixin = require('./MusicDataMixin');

var BAR_TO_STRING = {
  single: '|', double: '||', end: '|]',
  'repeat-begin': '|:', 'repeat-end': ':|', 'repeat-both': ':|:'
};

/**
 * @class
 * @param {string} bar - The bar value, which can be either of
 * - 'single' - `|`
 * - 'double' - `||`
 * - 'end' - `|]`
 * - 'repeat-begin' - `|:`
 * - 'repeat-end' - `:|`
 * - 'repeat-both' - `:|:`
 * @mixes musje.MusicData
 * @mixes musje.LayoutMusicData
 */
function Bar(bar) {
  this.value = bar;
}

util.defineProperties(Bar.prototype,
/** @lends musje.Bar.prototype */
{
  /**
   * Type of bar.
   * @type {string}
   * @constant
   * @default
   */
  $type: 'Bar',

  /**
   * Value of the bar, which is the same as the bar parameter in the constructor.
   * @member {string} - The bar value
   * @alias musje.Bar.prototype.value
   * @default
   */
  value: 'single',

  /**
   * Convert bar to string.
   * @return {string} Converted string of the barline in musje source code.
   */
  toString: function () {
    return BAR_TO_STRING[this.value];
  },

  toJSON: function () {
    return { bar: this.value };
  }
});

util.defineProperties(Bar.prototype, MusicDataMixin);

module.exports = Bar;
