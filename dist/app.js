"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Koa = require("koa");
var MovieController = require("./controllers/movie/movieController.js");
var app = new Koa();

// 连接数据库

var _require = require("./database/initDB.js"),
    connect = _require.connect;

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return connect();

                case 2:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();

app.use(MovieController.routes());
app.use(MovieController.allowedMethods());

app.listen("8964", "127.0.0.1", function () {
    console.log("Server is running at 8964");
});