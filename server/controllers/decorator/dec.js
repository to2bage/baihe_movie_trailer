const KoaRouter = require("koa-router");

const RequestMethods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
}

function Request ({url, method}) {
    return function (target, name, desc) {
        let fn = desc.value;
        desc.value = (router) => {
            router[method] (url, async (ctx, next) => {
                await fn(ctx, next);
            })
        }
    }
}

function Controller ({prefix}) {
    const router = new KoaRouter();
    if (prefix) {
        router.prefix(prefix);
    }
    return function (target) {
        let descs = Object.getOwnPropertyDescriptors(target.prototype);
        for (let key in descs) {
            if (key !== "constructor") {
                let fn = descs[key].value;
                fn(router);
            }
        }
        return router
    }
}

exports.Controller = Controller;
exports.Request = Request;
exports.RequestMethods = RequestMethods;