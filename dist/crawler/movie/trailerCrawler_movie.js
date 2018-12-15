"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var puppeteer = require("puppeteer");
// https://movie.douban.com/subject/3878007/
var trailerBaseUrl = "https://movie.douban.com/subject/";

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    process.on("message", function () {
                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(movies) {
                            var browser, i, movie, result;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return puppeteer.launch();

                                        case 2:
                                            browser = _context.sent;
                                            i = 0;

                                        case 4:
                                            if (!(i < movies.length)) {
                                                _context.next = 13;
                                                break;
                                            }

                                            movie = movies[i];
                                            _context.next = 8;
                                            return crawler_video(browser, movie.doubanId);

                                        case 8:
                                            result = _context.sent;

                                            console.log(result);

                                        case 10:
                                            i++;
                                            _context.next = 4;
                                            break;

                                        case 13:

                                            browser.close();

                                        case 14:
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

                case 1:
                case "end":
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
}))();

var crawler_video = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(browser, doubanId) {
        var trailerUrl, page, result, rect;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        trailerUrl = "" + trailerBaseUrl + doubanId;

                        console.log(trailerUrl);
                        _context3.next = 4;
                        return browser.newPage();

                    case 4:
                        page = _context3.sent;
                        _context3.next = 7;
                        return page.goto(trailerUrl, {
                            waitUntil: "networkidle2",
                            timeout: 0
                        });

                    case 7:
                        _context3.next = 9;
                        return page.evaluate(function () {
                            var aEle = document.querySelector(".related-pic-video");
                            var url = aEle.getAttribute("href");
                            var str = aEle.getAttribute("style");
                            // 从str中获得电影预告片的封面海报
                            var startIndex = str.indexOf("(") + 1;
                            var endIndex = str.indexOf(")");
                            var cover = "";
                            for (var i = startIndex; i < endIndex; i++) {
                                cover += str[i];
                            }
                            return {
                                cover: cover,
                                url: url,
                                doubanId: null,
                                trailer: null
                            };
                        });

                    case 9:
                        result = _context3.sent;
                        _context3.next = 12;
                        return page.goto(result.url, {
                            waitUntil: "networkidle2",
                            timeout: 0
                        });

                    case 12:
                        _context3.next = 14;
                        return page.evaluate(function () {
                            var sourceEle = document.querySelector("video > source");
                            return sourceEle.getAttribute("src");
                        });

                    case 14:
                        rect = _context3.sent;

                        result.trailer = rect;
                        result.doubanId = doubanId;

                        return _context3.abrupt("return", result);

                    case 18:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function crawler_video(_x2, _x3) {
        return _ref3.apply(this, arguments);
    };
}();