const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
      name: {type: String,required: true,unique: true,},
      permission: {
        "addTask":      {type: Boolean },
        "getTask":      {type: Boolean },
        "updateTask":   {type: Boolean },
        "deleteTask":   {type: Boolean },
        "addUser":      {type: Boolean },
        "getUser":      {type: Boolean },
        "updateUser":   {type: Boolean },
        "deleteUser":   {type: Boolean },
      }
    
})


module.exports = mongoose.model("Role",roleSchema)