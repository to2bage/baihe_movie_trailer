const puppeteer = require("puppeteer");
// https://movie.douban.com/subject/3878007/
const trailerBaseUrl = "https://movie.douban.com/subject/";



(async () => {
    const doubanId = "3878007";
    const trailerUrl = `${trailerBaseUrl}${doubanId}`;
    console.log(trailerUrl);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(trailerUrl, {
        waitUntil: "networkidle2",
        timeout: 0
    })

    const result = await page.evaluate(() => {
        let aEle = document.querySelector(".related-pic-video");
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
    })

    // console.log("初步的电影海报结果: ", result.cover);
    // console.log("初步的电影预告片的结果: ", result.url);

    // 继续获得电影预告片的确实的地址
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

    console.log(result);
})();