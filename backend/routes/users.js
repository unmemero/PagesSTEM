const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Register new user
router.post('/register', async (req, res)=>{
    const {name,email,password,role} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const newUser = User({
            name,
            email,
            password,
            role: role || 'user'
        });

        await newUser.save();
        const token = jwt.sign({id: newUser._id, role:newUser.role}, process.env.JWT_SECRET,{expiresIn: '1h'});
        res.status(201).json({token});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

//Login
router.post('/login',async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Wrong password'});
        }

        const token = jwt.sign({id:user._id,role: user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;