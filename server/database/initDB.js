const mongoose = require("mongoose");
const config = require("../config/index.js");
const url = `mongodb://47.91.156.189:27017/${config.db.name}`;

const connect = () => {
    return new Promise((resolve, reject) => {
        let curConnectionCount = 0;
        let maxConnectionCount = 5;

        console.log("===> ", url);                          // test

        mongoose.connect(url, {useNewUrlParser: true});

        mongoose.connection.on("error", async err => {
            curConnectionCount++;
            if (curConnectionCount < maxConnectionCount) {
                mongoose.connect(url, {useNewUrlParser: true});
            } else {
                // throw new Error("数据库出错: ", err;
                reject(new Error("数据库出错: ", err));
            }
        });
        mongoose.connection.on("disconnect", async () => {
            curConnectionCount++;
            if (curConnectionCount < maxConnectionCount) {
                mongoose.connect(url, {useNewUrlParser: true});
            }
        });
        mongoose.connection.once("open", () => {
            console.log("~~~数据库连接成功哦~~~");
            resolve();
        });
    })
}

exports.connect = connect;