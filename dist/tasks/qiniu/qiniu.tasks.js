'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var qiniu = require('qiniu');
var nanoid = require('nanoid');
var config = require('../../config/index.js');
var mongoose = require('mongoose');
// const Movie = mongoose.model('Movie')

var _require = require("../../database/schema/movie/movieSchma.js"),
    Movie = _require.Movie;

var bucket = config.qiniu.bucket;
var mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
var cfg = new qiniu.conf.Config();
var client = new qiniu.rs.BucketManager(mac, cfg);

var uploadToQiniu = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, key) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              client.fetch(url, bucket, key, function (err, ret, info) {
                if (err) {
                  reject(err);
                } else {
                  if (info.statusCode === 200) {
                    resolve({ key: key });
                  } else {
                    reject(info);
                  }
                }
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function uploadToQiniu(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var movies, i, movie, videoData, coverData, posterData;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Movie.find({
            $or: [{ tailerKey: { $exists: false } }, { tailerKey: null }, { tailerKey: '' }]
          });

        case 2:
          movies = _context2.sent;
          i = 0;

        case 4:
          if (!(i < movies.length)) {
            _context2.next = 34;
            break;
          }

          movie = movies[i];

          if (!(movie.tailer && !movie.tailerKey)) {
            _context2.next = 31;
            break;
          }

          _context2.prev = 7;

          console.log('开始传 video');
          _context2.next = 11;
          return uploadToQiniu(movie.tailer, nanoid() + '.mp4');

        case 11:
          videoData = _context2.sent;

          console.log('开始传 cover');
          _context2.next = 15;
          return uploadToQiniu(movie.cover, nanoid() + '.png');

        case 15:
          coverData = _context2.sent;

          console.log('开始传 poster');
          _context2.next = 19;
          return uploadToQiniu(movie.poster, nanoid() + '.png');

        case 19:
          posterData = _context2.sent;


          if (videoData.key) {
            movie.tailerKey = videoData.key;
          }
          if (coverData.key) {
            movie.coverKey = coverData.key;
          }
          if (posterData.key) {
            movie.posterKey = posterData.key;
          }

          console.log(movie);

          _context2.next = 26;
          return movie.save();

        case 26:
          _context2.next = 31;
          break;

        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2['catch'](7);

          console.log(_context2.t0);

        case 31:
          i++;
          _context2.next = 4;
          break;

        case 34:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined, [[7, 28]]);
}))();