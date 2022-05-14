import { describe, it, expect, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import fakerUser from '../authHelper';
import User from '../../src/models/User';

const request = supertest(app);

describe('user controllers test', () => {
  describe('registering a new user', () => {
      it('returns 200 for successfully register a user', async()=> {
          const {body}= await request.post('/user/register').send(fakerUser.user).expect(201)
          expect(body.message).to.equal("User was created successfully")
      })
      it('returns (409 error) for duplicate email', () => {
       const {body} = request
          .post('/v1/user/register')
          .send(fakerUser.user)  
            .expect(409)
          
      });
    it('returns 400 error if the first name field is empty', async () => {
      const { body } = await request
        .post('/user/register')
        .send(fakerUser.wrongUser)
        .expect(400);
      expect(body.firstName).to.equal('FirstName is required');
    });
    it('returns 400 error if the last name field is empty', async () => {
      const { body } = await request
        .post('/user/register')
        .send(fakerUser.wrongUser1)
        .expect(400);
      expect(body.lastName).to.equal('LastName is required');
    });
    it('returns 400 error if the email field is invalid', async () => {
      const { body } = await request
        .post('/user/register')
        .send(fakerUser.wrongUser2)
        .expect(400);
      expect(body.email).to.equal('Email is invalid');
    });
    it('returns 400 error if the email field is not lowercase', async () => {
      const { body } = await request
        .post('/user/register')
        .send(fakerUser.wrongUser6)
        .expect(400);
      expect(body.email).to.equal("Email must be in lowercase");
    });
    it('return 400 error if the password field is empty or invalid', async()=> {
        const { body} = await request.post('/user/register').send(fakerUser.wrongUser3);
        expect(body.password).to.equal("Password must be at least 8 character  containing at least 1 lowercase, number, uppercase, symbols")
    })
    it('return 400 error if the phone number field is empty or invalid', async()=> {
        const { body} = await request.post('/user/register').send(fakerUser.wrongUser4);
        expect(body.phoneNumber).to.equal("Phone Number is invalid")
    })
    it('return 400 error if the city, address, gender and state field are empty', async()=> {
        const { body} = await request.post('/user/register').send(fakerUser.wrongUser5);
        expect(body.city).to.equal("City is required")
        expect(body.address).to.equal("Address is required")
        expect(body.state).to.equal('State is required')
        expect(body.gender).to.equal('Gender is required')
    })

  });

  it('should get all users', async () => {
    const { body } = await request.get('/user/admin/users').expect(200);

    expect(body.message).to.equal('Users fetched Successfully');
  });

  describe('deleting a user', () => {
    it('it should successfully delete a user', async () => {
      const { _id } = await new User(fakerUser.User).save();

      const { body } = await request.delete(`/user/${_id}`).expect(200);
      expect(body.message).to.equal('User Deleted');
    });
    it('should return 404 for no user  found to deleted ', async () => {
      const id = '41224d776a326fb40f000001';
      const { body } = await request.delete(`/user/${id}`).expect(404);
      expect(body.error).to.equal('User Not Found');
    });
    it("shouldn't delete admin", async () => {
      const { _id } = await new User(fakerUser.user2).save();
      const { body } = await request.delete(`/user/${_id}`).expect(400);
      expect(body.message).to.equal('Can Not Delete Admin User');
    });
  });
  describe('getting a user', () => {
    it('return 200 for getting a user', async () => {
      const { _id } = await new User(fakerUser.User).save();
      const { body } = await request.get(`/user/${_id}`).expect(200);
      expect(body.email).to.equal(fakerUser.User.email);
    });
    it('return 400 for getting a user', async () => {
      const id = '41224d776a326fb40f000001';
      const { body } = await request.get(`/user/${id}`).expect(404);
      expect(body.error).to.equal('User Not Found');
    });
  });
  describe('activating a user', () => {
    it('should activate a user', async () => {
      await new User(fakerUser.user3).save();
      const { body } = await request
        .patch('/user/activate')
        .send({activationCode: "perejumbo"})
        .expect(200);
        expect(body.activatedUser.activated).to.be.true;
        expect(body).to.have.property('token')
     ;
    });
    it('should return 404 for invalid activation token', async () => {
      const activationCode = '1234as5errtv';
      const { body } = await request
        .patch('/user/activate')
        .send(activationCode)
        .expect(404);
      expect(body.error).to.equal('activate code is invalid');
    });
    it('should return 400 for already activated user', async () => {
       
      const { body } = await request
        .patch('/user/activate')
        .send({activationCode: 'testing'})
        .expect(400);
      expect(body.error).to.equal('User already activated');
    });
  });
  describe('logining a user', ()=> {
      it('successfully login a user', async()=> {
          
      })
      it('returns 401 unauthorization', async()=> {
          const {body} = await request.post('/user/login').send({
             email:"test@test.com",
             password:"pere7834"
          }).expect(401)
          expect(body.error).to.equal('User not found')
      })
      it('returns 400 if password is not given', async()=> {
          
          const {body} = await request.post('/user/login').send({
             email:"test@test.com",
          }).expect(400)
          expect(body.password).to.equal('Password is required')
      })
      it('returns 400 if email is not given', async()=> {
          
          const {body} = await request.post('/user/login').send({
            password:"34578aloj"
          }).expect(400)
          expect(body.email).to.equal('Email is invalid')
      })
      it('returns 400 for invalid email format', async()=> {
          
          const {body} = await request.post('/user/login').send({
              email:"test",
            password:"34578aloj"
          }).expect(400)
          expect(body.email).to.equal('Email is invalid')
      })
  })
  
});
