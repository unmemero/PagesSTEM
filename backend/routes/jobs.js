const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/',async(req,res)=>{
    try{
        const jobs = await Job.find();
        res.json(jobs);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific job
router.get('/:id',getJob,(req,res)=>{
    try{
        res.json(res.job);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Create a job
router.post('/',async(req,res)=>{
    const job = new Job({
        title: req.body.title,
        company: req.body.company,
        locations: req.body.locations,
        description: req.body.description,
        requirements: req.body.requirements,
        preferredMajors: req.body.preferredMajors,
        datePosted: req.body.datePosted,
        deadline: req.body.deadline,
        payType: req.body.payType,
        payAmount: req.body.payAmount,
        payPeriod: req.body.payPeriod,
        applicationLink: req.body.applicationLink,
        uploader: req.body.uploader,
    });
    try{
        const newJob = await job.save();
        res.status(201).json(newJob);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

// Update a job
router.patch('/:id',getJob,async(req,res)=>{
    if(req.body.title != null){
        res.job.title = req.body.title;
    }
    if(req.body.company != null){
        res.job.company = req.body.company;
    }
    if(req.body.locations != null){
        res.job.locations = req.body.locations;
    }
    if(req.body.description != null){
        res.job.description = req.body.description;
    }
    if(req.body.requirements != null){
        res.job.requirements = req.body.requirements;
    }
    if(req.body.preferredMajors != null){
        res.job.preferredMajors = req.body.preferredMajors;
    }
    if(req.body.datePosted != null){
        res.job.datePosted = req.body.datePosted;
    }
    if(req.body.deadline != null){
        res.job.deadline = req.body.deadline;
    }
    if(req.body.payType != null){
        res.job.payType = req.body.payType;
    }
    if(req.body.payAmount != null){
        res.job.payAmount = req.body.payAmount;
    }
    if(req.body.payPeriod != null){
        res.job.payPeriod = req.body.payPeriod;
    }
    if(req.body.applicationLink != null){
        res.job.applicationLink = req.body.applicationLink;
    }
    if(req.body.uploader != null){
        res.job.uploader = req.body.uploader;
    }
    try{
        const updatedJob = await res.job.save();
        res.json(updatedJob);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Delete a job
router.delete('/:id',getJob,async(req,res)=>{
    try{
        await res.job.deleteOne();
        res.json({message:'Job deleted'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

async function getJob(req,res,next){
    let job;
    try{
        job = await Job.findById(req.params.id);
        if(job == null){
            return res.status(404).json({message:'Job not found'});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.job = job;
    next();
}

module.exports = router;