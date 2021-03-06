const puppeteer = require("puppeteer");

// https://movie.douban.com/subject/3878007/
const trailerBaseUrl = "https://movie.douban.com/subject/";

(async () => {
    process.on("message", async movies => {
        // console.log(movies);
        const trailers = [];
        const browser = await puppeteer.launch();

        for (let i = 0; i < movies.length; i++) {
            let movie = movies[i];
            let result = await crawler_video(browser, movie.doubanId);
            // console.log(result);
            trailers.push(result);
        }

        browser.close();

        // process.send(trailers);
        const msg = await sendMessage(trailers);
        console.log(msg);

        process.exit(0);
    })
})()

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

const crawler_video = async  (browser, doubanId) => {
    const trailerUrl = `${trailerBaseUrl}${doubanId}`;
    console.log(trailerUrl);
    const page = await browser.newPage();
    await page.goto(trailerUrl, {
        waitUntil: "networkidle2",
        timeout: 0
    })

    const result = await page.evaluate(() => {
        let aEle = document.querySelector(".related-pic-video");
        if (aEle) {
            let url = aEle.getAttribute("href");
            let str = aEle.getAttribute("style");
            // 从str中获得电影预告片的封面海报
            let startIndex = str.indexOf("(") + 1;
            let endIndex = str.indexOf(")");
            let cover = "";
            for (let i = startIndex; i < endIndex; i++) {
                cover += str[i];
            }
            return {
                cover: cover,
                url: url,
                doubanId: null,
                trailer: null
            }
        } else {
            return {
                cover: "",
                url: "",
                doubanId: null,
                trailer: ""
            }
        }
    })

    if (result.url !== "") {
        await page.goto(result.url, {
            waitUntil: "networkidle2",
            timeout: 0
        })
    
        let rect = await page.evaluate(() => {
            let sourceEle = document.querySelector("video > source");
            return sourceEle.getAttribute("src");
        })
        result.trailer = rect;
        result.doubanId = doubanId;
    } else {
        result.doubanId = doubanId;
    }

    return result;
}