const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

//Save internship
router.post('/internships/:id',auth,async(req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        user.savedInternships.push(req.params.id);
        await user.save();
        res.json(user.savedInternships);
    }catch(err){
        req.statusCode(500).json({message:err.message});
    }
});

//Save job
router.post('/jobs/:id',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user);
        user.savedJobs.push(req.params.id);
        await user.save();
        res.json(user.savedJobs);
    }catch(err){
        req.statusCode(500).json({message:err.message});
    }
});

//Save scholarship
router.post('/scholarships/:id',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user);
        user.savedScholarships.push(req.params.id);
        await user.save();
        res.json(user.savedScholarships);
    }catch(err){
        req.statusCode(500).json({message:err.message});
    }
});

//Save Organization
router.post('/organizations/:id',auth,async(req,res)=>{
    try{
        const user = await User.findById(req.user);
        user.savedOrganizations.push(req.params.id);
        await user.save();
        res.json(user.savedOrganizations);
    }catch(err){
        req.statusCode(500).json({message:err.message});
    }
});

//Get Saved Internships
router.get('/internships',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user).populate('savedInternships');
        res.json(user.savedInternships);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//Get Saved Jobs
router.get('/jobs',auth,async(req,res)=>{
    try{
        const user = User.findById(req.user).populate('savedJobs');
        res.json(user.savedJobs);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//Get saved scholarships
router.get('/scholarships',auth,async(req,res)=>{
    try{
        const user = User.findById(req.user).populate('savedScholarships'); 
        res.json(user.savedScholarships);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//Get saved Organizations
router.get('/organizations',auth,async(req,res)=>{
    try{
        const user = User.findById(req.user).populate('savedsOrganizations');
        res.josn*(user.savedOrganizations);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;