var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken")
require("dotenv").config()

const AdminUserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    status: {
        type: Boolean
    },
}, { timestamps: true })

AdminUserModel.pre(
    'save', async function (next) {
        if( this.isModified('password') ){
            this.password = await bcrypt.hash( this.password, 12 )
        }
        next()
    })
    AdminUserModel.methods.generateToken = async function(){
        return jwt.sign({_id:this._id,email:this.email,},process.env.SECRET_KEY)
    }
    AdminUserModel.methods.generateRefreshToken = async function(){
        return jwt.sign({_id:this._id,email:this.email,},process.env.REFRESH_JWT_SECRET,{expiresIn:process.env.REFRESH_JWT_EXPIRATION})
    }



const Admin = mongoose.model("admin_users", AdminUserModel);
module.exports = Admin;