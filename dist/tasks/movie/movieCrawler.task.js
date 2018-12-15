"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var childProcess = require("child_process");
var mongoose = require("mongoose");

var _require = require("path"),
    resolve = _require.resolve;

var _require2 = require("../../database/schema/movie/movieSchma.js"),
    Movie = _require2.Movie;

var movie_crawler_script = resolve(__dirname, "../../crawler/movie/movieCrawler.js");

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var cp;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    cp = childProcess.fork(movie_crawler_script, []);


                    cp.on("close", function (code, signal) {
                        console.log("子进程关闭: ", code);
                    });
                    cp.on("disconnect", function () {
                        console.log("子进程断开连接");
                    });
                    cp.on("error", function (code) {
                        console.log("子进程错误: ", code);
                    });
                    cp.on("exit", function (code, signal) {
                        console.log("子进程退出: ", code);
                    });
                    cp.on("message", function (obj) {
                        console.log("Get from child process: \n", obj.links);
                        var items = obj.links;

                        items.forEach(function () {
                            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
                                var movieItem;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return Movie.findOne({ doubanId: item.doubanId }).exec();

                                            case 2:
                                                movieItem = _context.sent;

                                                if (movieItem) {
                                                    _context.next = 7;
                                                    break;
                                                }

                                                movieItem = new Movie(item);
                                                _context.next = 7;
                                                return movieItem.save();

                                            case 7:
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
                    });

                case 6:
                case "end":
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
}))();