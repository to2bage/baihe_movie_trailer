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

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var movies, cp;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return Movie.find({}).exec();

                case 2:
                    movies = _context.sent;
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
                    cp.on("message", function (obj) {
                        // 从子进程那里获得的数据
                    });

                    cp.send(movies); // 父进程将所有的电影数据发送给子进程

                case 10:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();