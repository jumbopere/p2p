import faker from 'faker'

const fakerUser = {
  user: {
    firstName: faker.name.firstName(),
     lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender(),
    activationCode:faker.random.alphaNumeric(6)
  },
  user1: {
    firstName: "pere",
     lastName: "jumbo",
    email: "jumboperebara0@gmail.com",
    password:"12345678",
    phoneNumber: "09032276546",
    city: "satellite",
    state: "lagos",
    address:"6 udoka okeke",
    gender:"male"
  },
  user2: {
    firstName: "pere",
     lastName: "jumbo",
    email: "jumboperebara0@gmail.com",
    password:"12345678",
    phoneNumber: "0903227656",
    city: "satellite",
    state: "lagos",
    address:"6 udoka okeke",
    gender:"male",
    isAdmin: true,
    activationCode:"testing",
    activated:true
  },
  user3: {
    firstName: "pere",
     lastName: "jumbo",
    email: "jumbopere9@gmail.com",
    password:"12345678",
    phoneNumber: "09032276546",
    city: "satellite",
    state: "lagos",
    address:"6 udoka okeke",
    gender:"male",
    activationCode:faker.random.alphaNumeric(6)
  },


  wrongUser: {
    firstName: undefined,
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(8),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  wrongUser1: {
    firstName: faker.name.firstName(),
    lastName: undefined,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender()
  },
  wrongUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: undefined,
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  wrongUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: undefined,
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  wrongUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password:faker.internet.password() ,
    phoneNumber: undefined,
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  wrongUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: undefined,
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  wrongUser6: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: undefined,
    address:faker.address.streetAddress(),
    gender:faker.name.gender() 
  },
  
  wrongUser7: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:undefined,
    gender:faker.name.gender() 
  },
  
  wrongUser8: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    city: faker.address.city(),
    state: faker.address.state(),
    address:faker.address.streetAddress(),
    gender: undefined 
  },
  
 
};

export default fakerUser;