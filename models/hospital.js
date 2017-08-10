const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const hospitalSchema = new Schema({
    hospitalName: { type: String, required: true, unique: true },
    alias: { type: String, required: true, unique: true },
    hospitalType: { type: String, required: true, unique: true },
    hospitalAddress: { type: String, required: true, unique: true },    
    hospitalPhoneno:{type: Number,  required: true, unique: true},
    hospitalEmail: { type: String, required: true, unique: true },
    hospitalWebsite: { type: String, required: true, lowercase: true },
    noOfSurgeons:{type: Number , default: 0},
    noOfSupportStaffs:{type: Number , default: 0},
    hasBranch:{type: String , default: 'No'},
    noOfBranches:{type: Number , default: 0},
    branchDetails:[{
        branchName:{type: String , required: true , unique: true},
        branchAlias:{type: String , required: true , unique: true},
        branchType:{type: String , required: true , unique: true},
        branchAddress:{type: String , required: true , unique: true},
        branchPhoneno:{type: Number,  required: true, unique: true},
        branchEmail: { type: String, required: true, unique: true },
        branchWebsite: { type: String, required: true, lowercase: true },
        branchNoOfSurgeons:{type: Number , default: 0},
        branchNoOfSupportStaffs:{type: Number , default: 0}
    }]
});

module.exports = mongoose.model('Hospital', hospitalSchema);