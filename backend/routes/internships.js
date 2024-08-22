const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/role');

// Get all internships
router.get('/',async(req,res)=>{
    try{
        const internships = await Internship.find();
        res.json(internships);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific internship
router.get('/:id',getInternship,(req,res)=>{
    try{
        res.json(res.internship);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Create an internship
router.post('/',auth,adminOnly,async(req,res)=>{
    const internship = new Internship({
        title: req.body.title,
        company: req.body.company,
        locations: req.body.locations,
        description: req.body.description,
        requirements: req.body.requirements,
        preferredMajors: req.body.preferredMajors,
        datePosted: req.body.datePosted,
        deadline: req.body.deadline,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        payType: req.body.payType,
        payAmount: req.body.payAmount,
        payPeriod: req.body.payPeriod,
        applicationLink: req.body.applicationLink,
        uploader: req.body.uploader,
    });
    try{
        const newInternship = await internship.save();
        res.status(201).json(newInternship);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// Update an internship
router.patch('/:id',getInternship,auth,adminOnly,async(req,res)=>{
    if(req.body.title != null){
        res.internship.title = req.body.title;
    }
    if(req.body.company != null){
        res.internship.company = req.body.company;
    }
    if(req.body.locations != null){
        res.internship.locations = req.body.locations;
    }
    if(req.body.description != null){
        res.internship.description = req.body.description;
    }
    if(req.body.requirements != null){
        res.internship.requirements = req.body.requirements;
    }
    if(req.body.preferredMajors != null){
        res.internship.preferredMajors = req.body.preferredMajors;
    }
    if(req.body.datePosted != null){
        res.internship.datePosted = req.body.datePosted;
    }
    if(req.body.deadline != null){
        res.internship.deadline = req.body.deadline;
    }
    if(req.body.startDate != null){
        res.internship.startDate = req.body.startDate;
    }
    if(req.body.endDate != null){
        res.internship.endDate = req.body.endDate;
    }
    if(req.body.payType != null){
        res.internship.payType = req.body.payType;
    }
    if(req.body.payAmount != null){
        res.internship.payAmount = req.body.payAmount;
    }
    if(req.body.payPeriod != null){
        res.internship.payPeriod = req.body.payPeriod;
    }
    if(req.body.applicationLink != null){
        res.internship.applicationLink = req.body.applicationLink;
    }
    if(req.body.uploader != null){
        res.internship.uploader = req.body.uploader;
    }
    try{
        const updatedInternship = await res.internship.save();
        res.json(updatedInternship);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// Delete an internship
router.delete('/:id',getInternship,auth,adminOnly,async(req,res)=>{
    try{
        await res.internship.deleteOne();
        res.json({message:'Internship deleted'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

async function getInternship(req, res, next){
    let internship;
    try{
        internship = await Internship.findById(req.params.id);
        if(internship == null){
            return res.status(404).json({message:'Internship not found'});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.internship = internship;
    next();
}

module.exports = router;