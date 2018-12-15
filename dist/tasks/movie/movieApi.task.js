"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require("mongoose");

var _require = require("../../database/schema/movie/movieSchma.js"),
    Movie = _require.Movie;

var _require2 = require("../../database/schema/movie/categorySchema.js"),
    Category = _require2.Category;

(0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var movies, i, item, j, genre, category;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return Movie.find({}).exec();

                case 2:
                    movies = _context.sent;

                    if (!movies) {
                        _context.next = 27;
                        break;
                    }

                    i = 0;

                case 5:
                    if (!(i < movies.length)) {
                        _context.next = 25;
                        break;
                    }

                    item = movies[i];

                    //#region forEach
                    // 要特别注意的是: forEach是异步的拿去集合Category中的数据, 可能造成重复的现象
                    // 两个相同内容的数据, 第一个还没有存到集合中; 第二个判断集合中没有这个数据,就存到了集合中, 造成数据的重复
                    // 所以, 不能这样 在异步的情况下分别的判断数据库中是否有重复的数据
                    // item.genres.forEach(async genre => {
                    //     let category = await Category.findOne({name: genre}).exec();
                    //     if (!category) {
                    //         category = new Category({
                    //             name: genre,
                    //             movies: [item._id]
                    //         })
                    //     } else {
                    //         if (!category.movies) {
                    //             category.movies = [item._id]
                    //         } else {
                    //             if (category.movies.indexOf(item._id) === -1) {
                    //                 category.movies.push(item._id);
                    //             }
                    //         }
                    //     }
                    //     await category.save();
                    //     //
                    //     if (!item.categories) {
                    //         item.categories = [category._id]
                    //     } else {
                    //         if (item.categories.indexOf(category._id) === -1) {
                    //             item.categories.push(category._id);
                    //         }
                    //     }
                    //     await item.save();
                    // })
                    //#endregion

                    //#region for

                    j = 0;

                case 8:
                    if (!(j < item.genres.length)) {
                        _context.next = 22;
                        break;
                    }

                    genre = item.genres[j];
                    _context.next = 12;
                    return Category.findOne({ name: genre }).exec();

                case 12:
                    category = _context.sent;

                    if (!category) {
                        category = new Category({
                            name: genre,
                            movies: [item._id]
                        });
                    } else {
                        if (!category.movies) {
                            category.movies = [item._id];
                        } else {
                            if (category.movies.indexOf(item._id) === -1) {
                                category.movies.push(item._id);
                            }
                        }
                    }
                    _context.next = 16;
                    return category.save();

                case 16:
                    //
                    if (!item.categories) {
                        item.categories = [category._id];
                    } else {
                        if (item.categories.indexOf(category._id) === -1) {
                            item.categories.push(category._id);
                        }
                    }
                    _context.next = 19;
                    return item.save();

                case 19:
                    j++;
                    _context.next = 8;
                    break;

                case 22:
                    i++;
                    _context.next = 5;
                    break;

                case 25:
                    _context.next = 28;
                    break;

                case 27:
                    console.log("请检查数据库中是否有集合movies");

                case 28:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();