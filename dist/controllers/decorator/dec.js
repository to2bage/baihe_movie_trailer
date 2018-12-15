"use strict";

var _getOwnPropertyDescriptors = require("babel-runtime/core-js/object/get-own-property-descriptors");

var _getOwnPropertyDescriptors2 = _interopRequireDefault(_getOwnPropertyDescriptors);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KoaRouter = require("koa-router");

var RequestMethods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};

function Request(_ref) {
    var url = _ref.url,
        method = _ref.method;

    return function (target, name, desc) {
        var _this = this;

        var fn = desc.value;
        desc.value = function (router) {
            router[method](url, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return fn(ctx, next);

                                case 2:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x, _x2) {
                    return _ref2.apply(this, arguments);
                };
            }());
        };
    };
}

function Controller(_ref3) {
    var prefix = _ref3.prefix;

    var router = new KoaRouter();
    if (prefix) {
        router.prefix(prefix);
    }
    return function (target) {
        var descs = (0, _getOwnPropertyDescriptors2.default)(target.prototype);
        for (var key in descs) {
            if (key !== "constructor") {
                var fn = descs[key].value;
                fn(router);
            }
        }
        return router;
    };
}

exports.Controller = Controller;
exports.Request = Request;
exports.RequestMethods = RequestMethods;