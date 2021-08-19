let mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true},
    blogImg:{ type: String},
    photo:{ type: String, required: true},
    type:{ type: String, required: true},
    like:{ type: Number, required: true},
    dislike:{ type: Number, required: true},
    title:{ type: String, required: true },
    description:{ type: String, required: true },
    privateUsers:{type:Array}
});

module.exports = mongoose.model('Blog',blogSchema,'BlogData');