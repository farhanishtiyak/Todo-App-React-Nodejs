const mongoose = require("mongoose");

// Shouldn't do this in real world just for learning purpose
mongoose.connect("mongodb+srv://Ishtiyak:SxUvmHMHOHVetUh1@cluster0.sna6coe.mongodb.net/Week-5-2_simple_todo_app");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed : Boolean
})

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };