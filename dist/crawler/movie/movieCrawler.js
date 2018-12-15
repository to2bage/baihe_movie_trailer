"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var url = "http://api.douban.com/v2/movie/top250?start=0&count=10";

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var docs, links;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return axios.get(url);

                case 3:
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
                    process.send({ links: links });
                    process.exit(0);
                    _context.next = 14;
                    break;

                case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](0);

                    console.log(_context.t0);
                    process.exit(101);

                case 14:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined, [[0, 10]]);
}))();