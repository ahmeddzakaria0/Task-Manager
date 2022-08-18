const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName : {type:String , required:true },
    taskDescription : {type:String , required:true },
    deadline : {type:String , required:true },
    assignedTo : [{type: mongoose.Schema.ObjectId,ref: 'Users'}],
    createdBy: {type: mongoose.Schema.ObjectId,ref: 'Users'}
})

module.exports = mongoose.model("Task",taskSchema)