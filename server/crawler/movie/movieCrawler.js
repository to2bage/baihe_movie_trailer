const axios = require("axios");
const url = "http://api.douban.com/v2/movie/top250?start=0&count=10";

(async () => {
    try {
        const docs = await axios.get(url);
        // console.log(docs.data.subjects);
        let links = [];
        docs.data.subjects.forEach(item => {
            let movieItem = {
                doubanId: item.doubanId,
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
        process.send({links})
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(101);
    }
})();