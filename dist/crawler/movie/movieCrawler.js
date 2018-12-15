"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
// http://api.douban.com/v2/movie/top250?start=0&count=10
var config = require("../../config/index.js");
var url = "http://api.douban.com/v2/movie/top250?start=0&count=" + config.movie.count;

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var docs, links, msg;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log("===> ", url);
                    _context.prev = 1;
                    _context.next = 4;
                    return axios.get(url);

                case 4:
                    docs = _context.sent;

                    // console.log(docs.data.subjects);
                    links = [];

                    docs.data.subjects.forEach(function (item) {
                        var movieItem = {
                            doubanId: item.id,
                            title: item.title,
                            original_title: item.original_title,
                            year: item.year,
                            poster: item.images.medium,
                            genres: item.genres,
                            rate: Number(item.rating.average),

                            tailer: "",
                            cover: "",

                            posterKey: "",
                            tailerKey: "",
                            coverKey: "",

                            categories: []
                        };
                        links.push(movieItem);
                    });
                    // console.log("=======>  links: \n", links);
                    // process.send({links})
                    // 此处更改process.send()
                    _context.next = 9;
                    return sendMessage({ links: links });

                case 9:
                    msg = _context.sent;

                    console.log("msg=> ", msg);

                    process.exit(0);
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](1);

                    console.log(_context.t0);
                    process.exit(101);

                case 18:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[1, 14]]);
}))();

var sendMessage = function sendMessage(obj) {
    return new _promise2.default(function (resolve, reject) {
        process.send(obj, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve("send back!!!");
            }
        });
    });
};