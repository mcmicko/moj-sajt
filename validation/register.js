const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  if(!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'ime mora da sadrzi izmedju 2 i 30 karaktera';
  }
  if(Validator.isEmpty(data.name)){
    errors.name = 'name se zahteva';
  }
  if(Validator.isEmpty(data.email)){
    errors.email = 'email se zahteva';
  }
  if(!Validator.isEmail(data.email)){
    errors.email = 'email nije dobar';
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'sifra se zahteva';
  }
  if(!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'najmanje 6, max 30';
  }
  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'potvrda sifre se zahteva';
  }
  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'mora da bude jednaka';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}