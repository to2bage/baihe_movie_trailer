"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var puppeteer = require("puppeteer");
// https://movie.douban.com/subject/3878007/
var trailerBaseUrl = "https://movie.douban.com/subject/";

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var doubanId, trailerUrl, browser, page, result, rect;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    doubanId = "3878007";
                    trailerUrl = "" + trailerBaseUrl + doubanId;
                    // console.log(trailerUrl);

                    _context.next = 4;
                    return puppeteer.launch();

                case 4:
                    browser = _context.sent;
                    _context.next = 7;
                    return browser.newPage();

                case 7:
                    page = _context.sent;
                    _context.next = 10;
                    return page.goto(trailerUrl, {
                        waitUntil: "networkidle2",
                        timeout: 0
                    });

                case 10:
                    _context.next = 12;
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

                case 12:
                    result = _context.sent;
                    _context.next = 15;
                    return page.goto(result.url, {
                        waitUntil: "networkidle2",
                        timeout: 0
                    });

                case 15:
                    _context.next = 17;
                    return page.evaluate(function () {
                        var sourceEle = document.querySelector("video > source");
                        return sourceEle.getAttribute("src");
                    });

                case 17:
                    rect = _context.sent;

                    result.trailer = rect;
                    result.doubanId = doubanId;

                    console.log(result);

                case 21:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();