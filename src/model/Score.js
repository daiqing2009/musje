'use strict';

var util = require('../util');
var ScoreHead = require('./ScoreHead');
var PartwiseParts = require('./PartwiseParts');
var TimewiseMeasures = require('./TimewiseMeasures');

/**
 * @class
 * @param {Object} score - plain score object {@link musje.PlainScore}.
 */
function Score(score) {
  util.extend(this, score);
}

util.defineProperties(Score.prototype,
/** @lends Score# */
{
  /**
   * Head of the score.
   * @type {ScoreHead}
   */
  head: {
    get: function () {
      return this._head || (this._head = new ScoreHead());
    },
    set: function (head) {
      this._head = new ScoreHead(head);
    }
  },

  /**
   * Partwise parts.
   * - (Getter)
   * - (Setter)
   * @type {PartwiseParts}
   */
  parts: {
    get: function () {
      return this._parts ||
            (this._parts = new PartwiseParts(this));
    },
    set: function (parts) {
      this.parts.removeAll();
      this.parts.addParts(parts);
      this.measures.fromPartwise();
    }
  },

  /**
   * Timewise measures, generated by the initialize function.
   * @type {TimewiseMeasures}
   * @readonly
   */
  measures: {
    get: function () {
      return this._measures ||
            (this._measures = new TimewiseMeasures(this));
    }
  },

  /**
   * Convert score to string.
   * @return {string} Musje source code.
   */
  toString: function () {
    return this.head + this.parts.map(function (part) {
      return part.toString();
    }).join('\n\n');
  },

  /**
   * Custom toJSON method.
   * @method
   * @return {Object}
   */
  toJSON: util.makeToJSON({
    head: undefined,
    parts: undefined
  }),

  /**
   * A cell is identically a measure in a part or a part in a measure.
   * @param {Function}
   */
  walkCells: function (callback) {
    this.parts.forEach(function (part, p) {
      part.measures.forEach(function (cell, m) {
        callback(cell, m, p);
      });
    });
  },

  /**
   * Walk each music data.
   * @param {Function} callback
   */
  walkMusicData: function (callback) {
    this.walkCells(function (cell, m, p) {
      cell.data.forEach(function (data, d) {
        callback(data, d, m, p);
      });
    });
  }
});

module.exports = Score;
