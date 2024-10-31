// models.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: { type: String, default: 'Task1' },
    createdAt: { type: Date, default: Date.now },
    desc: { type: String, default: 'Sample Desc1' },
    deadline: { type: String, default: new Date().toDateString() },
    completed: { type: Boolean, default: false }
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = { TaskModel };