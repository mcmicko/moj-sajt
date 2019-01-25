const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';



  if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = 'handle morad da bude 2-40karaktera';
  }

  if(Validator.isEmpty(data.handle)){
    errors.handle = 'handle se zahteva';
  }
  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
      errors.youtube = 'mora da bude sajt'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}