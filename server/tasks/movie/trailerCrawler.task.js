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
    cp.on("message", async (obj) => {
        // 从子进程那里获得的数据
        // console.log("Get From Child Process: \n", obj);
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            // 必须是findOne, 不能是find;
            let movie = await Movie.findOne({doubanId: item.doubanId}).exec();
            if (movie) {
                movie.tailer = item.trailer;
                movie.cover = item.cover;
                await movie.save();
                console.log(movie);
            }
        }
        console.log("it is over...");
    })

    cp.send(movies);        // 父进程将所有的电影数据发送给子进程
})();

/*
    { cover:
     'https://img3.doubanio.com/img/trailer/medium/1433841022.jpg?',
    url: 'https://movie.douban.com/trailer/108756/#content',
    doubanId: '1292052',
    trailer:
     'http://vt1.doubanio.com/201812151109/f4ee57507a1535a5a894508e7208fa9e/view/movie/M/301080756.mp4' }
*/