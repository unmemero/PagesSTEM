const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// Get all scholarships
router.get('/',async(req,res)=>{
    try{
        const scholarships = await Scholarship.find();
        res.json(scholarships);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific scholarship
router.get('/:id',getScholarship,(req,res)=>{
    try{
        res.json(res.scholarship);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Create a scholarship
router.post('/',async(req,res)=>{
    const scholarship = new Scholarship({
        title: req.body.title,
        organization: req.body.organization,
        majors: req.body.majors,
        locations: req.body.locations,
        description: req.body.description,
        requirements: req.body.requirements,
        datePosted: req.body.datePosted,
        deadline: req.body.deadline,
        awardAmmount: req.body.awardAmmount,
        applicationLink: req.body.applicationLink,
        contactEmail: req.body.contactEmail,
        uploader: req.body.uploader,
    });
    try{
        const newScholarship = await scholarship.save();
        res.status(201).json(newScholarship);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Update a scholarship
router.patch('/:id',getScholarship,async(req,res)=>{
    if(req.body.title != null){
        res.scholarship.title = req.body.title;
    }
    if(req.body.organization != null){
        res.scholarship.organization = req.body.organization;
    }
    if(req.body.majors != null){
        res.scholarship.majors = req.body.majors;
    }
    if(req.body.locations != null){
        res.scholarship.locations = req.body.locations;
    }
    if(req.body.description != null){
        res.scholarship.description = req.body.description;
    }
    if(req.body.requirements != null){
        res.scholarship.requirements = req.body.requirements;
    }
    if(req.body.datePosted != null){
        res.scholarship.datePosted = req.body.datePosted;
    }
    if(req.body.deadline != null){
        res.scholarship.deadline = req.body.deadline;
    }
    if(req.body.awardAmmount != null){
        res.scholarship.awardAmmount = req.body.awardAmmount;
    }
    if(req.body.applicationLink != null){
        res.scholarship.applicationLink = req.body.applicationLink;
    }
    if(req.body.contactEmail != null){
        res.scholarship.contactEmail = req.body.contactEmail;
    }
    if(req.body.uploader != null){
        res.scholarship.uploader = req.body.uploader;
    }
    try{
        const updatedScholarship = await res.scholarship.save();
        res.json(updatedScholarship);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Delete a scholarship
router.delete('/:id',getScholarship,async(req,res)=>{
    try{
        await res.scholarship.deleteOne();
        res.json({message:'Scholarship deleted'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

async function getScholarship(req,res,next){
    let scholarship;
    try{
        scholarship = await Scholarship.findById(req.params.id);
        if(scholarship == null){
            return res.status(404).json({message:'Cannot find scholarship'});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.scholarship = scholarship;
    next();
}

module.exports = router;