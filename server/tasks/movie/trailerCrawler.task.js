const childProcess = require("child_process");
const { resolve } = require("path");
const { Movie } = require("../../database/schema/movie/movieSchma.js");
const scriptPath = resolve(__dirname, "../../crawler/movie/trailerCrawler_movie.js");

(async () => {
    // 获得集合movies中的所有数据
    const movies = await Movie.find({}).exec();
    const cp = childProcess.fork(scriptPath, []);

    cp.on("close", (code, signal) => {
        console.log("子进程关闭了: ", code);
    })
    cp.on("disconnect", () => {
        console.log("子进程断开了连接");
    })
    cp.on("error", (err) => {
        console.log("子进程出现错误: ", err);
    })
    cp.on("exit", (code, signal) => {
        console.log("子进程退出了: ", code);
    })
    cp.on("message", (obj) => {
        // 从子进程那里获得的数据
    })

    cp.send(movies);        // 父进程将所有的电影数据发送给子进程
})();