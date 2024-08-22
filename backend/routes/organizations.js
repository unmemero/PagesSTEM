const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

// Get all organizations
router.get('/',async(req,res)=>{
    try{
        const organizations = await Organization.find();
        res.json(organizations);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Get a specific organization
router.get('/:id',getOrganization,(req,res)=>{
    try{
        res.json(res.organization);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Create an organization
router.post('/',async(req,res)=>{
    const organization = new Organization({
        title: req.body.title,
        logo: req.body.logo,
        location: req.body.location,
        description: req.body.description,
        meetings: req.body.meetings,
        dateAdded: req.body.dateAdded,
        website: req.body.website,
        majors: req.body.majors,
        contactEmail: req.body.contactEmail,
        socialLinks: req.body.socialLinks,
        uploader: req.body.uploader,
    });
    try{
        const newOrganization = await organization.save();
        res.status(201).json(newOrganization);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Update an organization
router.patch('/:id',getOrganization,async(req,res)=>{
    if(req.body.title != null){
        res.organization.title = req.body.title;
    }
    if(req.body.logo != null){
        res.organization.logo = req.body.logo;
    }
    if(req.body.location != null){
        res.organization.location = req.body.location;
    }
    if(req.body.description != null){
        res.organization.description = req.body.description;
    }
    if(req.body.meetings != null){
        res.organization.meetings = req.body.meetings;
    }
    if(req.body.dateAdded != null){
        res.organization.dateAdded = req.body.dateAdded;
    }
    if(req.body.website != null){
        res.organization.website = req.body.website;
    }
    if(req.body.majors != null){
        res.organization.majors = req.body.majors;
    }
    if(req.body.contactEmail != null){
        res.organization.contactEmail = req.body.contactEmail;
    }
    if(req.body.socialLinks != null){
        res.organization.socialLinks = req.body.socialLinks;
    }
    if(req.body.uploader != null){
        res.organization.uploader = req.body.uploader;
    }
    try{
        const updatedOrganization = await res.organization.save();
        res.json(updatedOrganization);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// Delete an organization
router.delete('/:id',getOrganization,async(req,res)=>{
    try{
        await res.organization.deleteOne();
        res.json({message:'Organization deleted'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

async function getOrganization(req,res,next){
    let organization;
    try{
        organization = await Organization.findById(req.params.id);
        if(organization == null){
            return res.status(404).json({message:'Organization not found'});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.organization = organization;
    next();
}

module.exports = router;