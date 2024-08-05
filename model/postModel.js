const mongoose = require('mongoose');

const posts = mongoose.Schema(
    {
        Name:{
            type: String,
            required: true
        },
        Category:{
            type: String,
            required: true
        },
        Address:{
            type: String,
            required: true
        },
        Description:{
            type: String,
            required: true
        },
        ImageURL:{
            type: String,
            required: true
        },
        Price:{
            type: Number,
            required: true
        },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Posts", posts);
