const mongoose = require("mongoose");
const { Movie } = require("../../database/schema/movie/movieSchma.js");
const { Category } = require("../../database/schema/movie/categorySchema.js");

(async () => {
    const movies = await Movie.find({}).exec();

    if (movies) {
        for (let i = 0; i < movies.length; i++) {
            let item = movies[i];
    
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
            for (let j = 0; j < item.genres.length; j++) {
                let genre = item.genres[j];
                let category = await Category.findOne({name: genre}).exec();
                if (!category) {
                    category = new Category({
                        name: genre,
                        movies: [item._id]
                    })
                } else {
                    if (!category.movies) {
                        category.movies = [item._id]
                    } else {
                        if (category.movies.indexOf(item._id) === -1) {
                            category.movies.push(item._id);
                        }
                    }
                }
                await category.save();
                //
                if (!item.categories) {
                    item.categories = [category._id]
                } else {
                    if (item.categories.indexOf(category._id) === -1) {
                        item.categories.push(category._id);
                    }
                }
                await item.save();
            }
            // await item.save();
            //#endregion
        }
    } else {
        console.log("请检查数据库中是否有集合movies");
    }
})();