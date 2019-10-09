const mongoose = require('mongoose');

const WorkSchema = mongoose.Schema({
    // title: String,
    // content: String
    action: Array,
    time: Date,
    parent: String,
    parentId: String,
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Work', WorkSchema);