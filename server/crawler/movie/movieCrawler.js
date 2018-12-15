const axios = require("axios");
// http://api.douban.com/v2/movie/top250?start=0&count=10
const config = require("../../config/index.js");
const url = `http://api.douban.com/v2/movie/top250?start=0&count=${config.movie.count}`;

(async () => {
    console.log("===> ", url);
    try {
        const docs = await axios.get(url);
        // console.log(docs.data.subjects);
        let links = [];
        docs.data.subjects.forEach(item => {
            let movieItem = {
                doubanId: item.id,
                title: item.title,
                original_title: item.original_title,
                year: item.year,
                poster: item.images.medium,
                genres: item.genres,
                rate: Number(item.rating.average),

                tailer: "",
                cover: "",

                posterKey: "",
                tailerKey: "",
                coverKey: "",

                categories: []
            }
            links.push(movieItem);
        })
        // console.log("=======>  links: \n", links);
        // process.send({links})
        // 此处更改process.send(), 等待process.send()完成向父进程传递完数据
        const msg = await sendMessage({links})
        console.log("msg=> ", msg);

        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(101);
    }
})();

const sendMessage = (obj) => {
    return new Promise((resolve, reject) => {
        process.send(obj, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("send back!!!")
            }
        })
    })
}