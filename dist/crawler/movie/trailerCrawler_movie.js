"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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
                            var trailers, browser, i, movie, result, msg;
                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            // console.log(movies);
                                            trailers = [];
                                            _context.next = 3;
                                            return puppeteer.launch();

                                        case 3:
                                            browser = _context.sent;
                                            i = 0;

                                        case 5:
                                            if (!(i < movies.length)) {
                                                _context.next = 14;
                                                break;
                                            }

                                            movie = movies[i];
                                            _context.next = 9;
                                            return crawler_video(browser, movie.doubanId);

                                        case 9:
                                            result = _context.sent;

                                            // console.log(result);
                                            trailers.push(result);

                                        case 11:
                                            i++;
                                            _context.next = 5;
                                            break;

                                        case 14:

                                            browser.close();

                                            // process.send(trailers);
                                            _context.next = 17;
                                            return sendMessage(trailers);

                                        case 17:
                                            msg = _context.sent;

                                            console.log(msg);

                                            process.exit(0);

                                        case 20:
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
                            if (aEle) {
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
                            } else {
                                return {
                                    cover: "",
                                    url: "",
                                    doubanId: null,
                                    trailer: ""
                                };
                            }
                        });

                    case 9:
                        result = _context3.sent;

                        if (!(result.url !== "")) {
                            _context3.next = 20;
                            break;
                        }

                        _context3.next = 13;
                        return page.goto(result.url, {
                            waitUntil: "networkidle2",
                            timeout: 0
                        });

                    case 13:
                        _context3.next = 15;
                        return page.evaluate(function () {
                            var sourceEle = document.querySelector("video > source");
                            return sourceEle.getAttribute("src");
                        });

                    case 15:
                        rect = _context3.sent;

                        result.trailer = rect;
                        result.doubanId = doubanId;
                        _context3.next = 21;
                        break;

                    case 20:
                        result.doubanId = doubanId;

                    case 21:
                        return _context3.abrupt("return", result);

                    case 22:
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