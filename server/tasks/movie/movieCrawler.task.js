const childProcess = require("child_process");
const mongoose = require("mongoose");
const { resolve } = require("path");
const { Movie } = require("../../database/schema/movie/movieSchma.js");
const movie_crawler_script = resolve(__dirname, "../../crawler/movie/movieCrawler.js");

(async () => {
    const cp = childProcess.fork(movie_crawler_script, []);

    cp.on("close", (code, signal) => {
        console.log("子进程关闭: ", code);
    })
    cp.on("disconnect", () => {
        console.log("子进程断开连接");
    })
    cp.on("error", (code) => {
        console.log("子进程错误: ", code);
    })
    cp.on("exit", (code, signal) => {
        console.log("子进程退出: ", code);
    })
    cp.on("message", (obj) => {
        console.log("Get from child process: \n", obj.links);
        const items = obj.links;
        
        items.forEach(async item => {
            let movieItem = await Movie.findOne({doubanId: item.doubanId}).exec();
            if (!movieItem) {
                movieItem = new Movie(item);
                await movieItem.save();
            }
        })
    })
})();