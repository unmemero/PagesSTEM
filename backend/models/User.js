const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'user',
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    savedInternships:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
        }
    ],
    savedJobs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
        }
    ],
    savedOrganizations:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
        }
    ],
    savedScholarships:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scholarship',
        }
    ],
});

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);