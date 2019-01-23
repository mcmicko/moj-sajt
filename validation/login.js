const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';



  if(Validator.isEmpty(data.email)){
    errors.email = 'email se zahteva';
  }
  if(!Validator.isEmail(data.email)){
    errors.email = 'email nije dobar';
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'sifra se zahteva';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}