const Koa = require("koa");
const MovieController = require("./controllers/movie/movieController.js");
const app = new Koa();

// 连接数据库
const { connect } = require("./database/initDB.js");
(async () => {
    await connect();
    require("./tasks/movie/movieCrawler.task.js");       // 根据豆瓣API, 获得电影的初步数据
    // require("./tasks/movie/movieApi.task.js");           // 根据电影的初步数据, 整理处集合movies和集合categories
    // require("./tasks/movie/trailerCrawler.task");           // 根据doubanId, 获得电影预告片的地址信息
    // require("./tasks/qiniu/qiniu.tasks.js");                // 将tailer, cover, poster的数据下载并上传到七牛的图床
})();

app.use(MovieController.routes());
app.use(MovieController.allowedMethods());

app.listen("8964", "127.0.0.1", () => {
    console.log("Server is running at 8964");
})