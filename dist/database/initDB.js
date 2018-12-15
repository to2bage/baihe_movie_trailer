"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");
var url = "mongodb://47.91.156.189:27017/baihe_movietrailer";

var connect = function connect() {
    return new _promise2.default(function (resolve, reject) {
        var curConnectionCount = 0;
        var maxConnectionCount = 5;

        mongoose.connect(url, { useNewUrlParser: true });

        mongoose.connection.on("error", function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                curConnectionCount++;
                                if (curConnectionCount < maxConnectionCount) {
                                    mongoose.connect(url, { useNewUrlParser: true });
                                } else {
                                    // throw new Error("数据库出错: ", err;
                                    reject(new Error("数据库出错: ", err));
                                }

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
        mongoose.connection.on("disconnect", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            curConnectionCount++;
                            if (curConnectionCount < maxConnectionCount) {
                                mongoose.connect(url, { useNewUrlParser: true });
                            }

                        case 2:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));
        mongoose.connection.once("open", function () {
            console.log("~~~数据库连接成功哦~~~");
            resolve();
        });
    });
};

exports.connect = connect;