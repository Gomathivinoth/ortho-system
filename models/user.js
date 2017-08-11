const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const userSchema = new Schema({    
    
    hospitalId:{type:String},
    branchId: {type:String},
    name : {type: String , required: true},   
    gender:{type: String, required : true},
    email:{type: String, required : true},
    phoneno:{type: Number, required : true},
    technicalno:{type: Number, required : true},
    username : {type:String , required:true , unique:true},
    password: {type:String , required:true},
    usertype: {type:String}
   
});

module.exports = mongoose.model('User', userSchema);