const { Controller, Request, RequestMethods } = require("../decorator/dec.js");

@Controller({prefix: "/movie"})
class MovieController {
    @Request({url: "/", method: RequestMethods.GET})
    async getAllMovies (ctx, next) {
        ctx.body = ctx.url + " get all movies";
    }

    @Request({url: "/:id", method: RequestMethods.GET})
    async getMovieById(ctx, next) {
        ctx.body = ctx.url + " get movie by id: " + ctx.params.id;
    }
}

module.exports = MovieController;