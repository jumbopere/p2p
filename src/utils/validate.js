import Validator from 'validator';
import isEmpty from 'is-empty';

export const registerValidator = (data) => {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.state = !isEmpty(data.state) ? data.state : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'FirstName is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'LastName is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender is required';
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = 'City is required';
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = 'State is required';
  }
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Phone is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Phone Number  is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isMobilePhone(data.phoneNumber)) {
    errors.email = 'Phone Number is invalid';
  }
  if (!Validator.isLowercase(data.email)) {
    errors.email = 'Email must be in lowercase';
  }
  if(!Validator.isStrongPassword(data.password)){
    errors.password = "Password must be at least 8 character  containing at least 1 lowercase, uppercase, symbols  "
}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
