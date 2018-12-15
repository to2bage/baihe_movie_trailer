"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var childProcess = require("child_process");

var _require = require("path"),
    resolve = _require.resolve;

var _require2 = require("../../database/schema/movie/movieSchma.js"),
    Movie = _require2.Movie;

var scriptPath = resolve(__dirname, "../../crawler/movie/trailerCrawler_movie.js");

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var movies, cp;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return Movie.find({}).exec();

                case 2:
                    movies = _context2.sent;
                    cp = childProcess.fork(scriptPath, []);


                    cp.on("close", function (code, signal) {
                        console.log("子进程关闭了: ", code);
                    });
                    cp.on("disconnect", function () {
                        console.log("子进程断开了连接");
                    });
                    cp.on("error", function (err) {
                        console.log("子进程出现错误: ", err);
                    });
                    cp.on("exit", function (code, signal) {
                        console.log("子进程退出了: ", code);
                    });
                    cp.on("message", function () {
                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(obj) {
                            var i, item, movie;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            i = 0;

                                        case 1:
                                            if (!(i < obj.length)) {
                                                _context.next = 15;
                                                break;
                                            }

                                            item = obj[i];
                                            _context.next = 5;
                                            return Movie.findOne({ doubanId: item.doubanId }).exec();

                                        case 5:
                                            movie = _context.sent;

                                            if (!movie) {
                                                _context.next = 12;
                                                break;
                                            }

                                            movie.tailer = item.trailer;
                                            movie.cover = item.cover;
                                            _context.next = 11;
                                            return movie.save();

                                        case 11:
                                            console.log(movie);

                                        case 12:
                                            i++;
                                            _context.next = 1;
                                            break;

                                        case 15:
                                            console.log("it is over...");

                                        case 16:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function (_x) {
                            return _ref2.apply(this, arguments);
                        };
                    }());

                    cp.send(movies); // 父进程将所有的电影数据发送给子进程

                case 10:
                case "end":
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
}))();

/*
    { cover:
     'https://img3.doubanio.com/img/trailer/medium/1433841022.jpg?',
    url: 'https://movie.douban.com/trailer/108756/#content',
    doubanId: '1292052',
    trailer:
     'http://vt1.doubanio.com/201812151109/f4ee57507a1535a5a894508e7208fa9e/view/movie/M/301080756.mp4' }
*/