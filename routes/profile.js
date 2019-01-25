const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../validation/profile');


//load profile model
const Profile = require('../models/Profile');
//load user profile
const User = require('../models/User');
//profile test
router.get('/test', (req,res) => res.json({msg: 'profil radi'}));

//GET PROFILE - get current user profile
//private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'there is no profile for this user';
        return res.status(404).json(errors)
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//GET ALL users
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles){
        errors.noprofile = 'there is no profiles';
        return res.status(404).json();
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({profile:'nepostoji takav user'}));
})

//GET PROFILE/HANDLE/:HANDLE - get profile by handle - PUBLIC
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'there is no profile for this uuser';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({profile:'nepostoji takav user'}))
});

//GET PROFILE/USER/:USER_ID - get profile by user_id - PUBLIC
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'there is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({profile:'nepostoji takav user'}));
});


//POST PROFILE - create user profile - private
router.post('/', passport.authenticate('jwt', {session: false}),
(req, res) => {
  const {errors, isValid} = validateProfileInput(req.body)
  //check validation
  if(!isValid){
    //return any errors with 400 status
    return res.status(400).json(errors)
  }
  //get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.location) profileFields.location = req.body.location;
  //educ
  profileFields.education = {};
  if(req.body.school) profileFields.education.school = req.body.school;
  if(req.body.degree) profileFields.education.degree = req.body.degree;
  if(req.body.profileFields) profileFields.education.profileFields = req.body.profileFields;
  if(req.body.from) profileFields.education.from = req.body.from;
  if(req.body.to) profileFields.education.to = req.body.to;
  if(req.body.current) profileFields.education.current = req.body.current;
  if(req.body.description) profileFields.education.description = req.body.description;

  // //social
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile){
        //update
        Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new:true})
          .then(profile => res.json(profile));
      } else {
        //create

        //check if handle exist
        Profile.findOne({handle: profileFields.handle}).then(profile => {
          if(profile){
            errors.handle = 'that handle already exist';
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })
})


module.exports = router;