"use strict";

var mongoose = require("mongoose");
var CategorySchema = new mongoose.Schema({
    name: String,
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports.Category = mongoose.model("Category", CategorySchema);