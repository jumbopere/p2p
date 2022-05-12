import { describe, it, expect, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import fakerUser from '../authHelper';
import User from '../../src/models/User';

const request = supertest(app);

describe('user controllers test', () => {
    describe('registering a new user', )

  it('should get all users', async () => {
    const { body } = await request.get('/user/admin/users').expect(200);

    expect(body.message).to.equal('Users fetched Successfully');
  });
  

  describe('deleting a user', () => {
    it('it should successfully delete a user', async () => {
      const { _id } = await new User(fakerUser.user).save();

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
      const { _id } = await new User(fakerUser.user).save();
      const { body } = await request.get(`/user/${_id}`).expect(200);
      expect(body.email).to.equal(fakerUser.user.email);
    });
    it('return 400 for getting a user', async () => {
      const id = '41224d776a326fb40f000001';
      const { body } = await request.get(`/user/${id}`).expect(404);
      expect(body.error).to.equal('User Not Found');
    });
  });
  describe('activating a user', () => {
    // it('should activate a user', async () => {
    //   const { activationCode } =  new User(fakerUser.user3).save();
    //   const { body } = await request
    //     .patch('/user/activate')
    //     .send(activationCode)
    //     .expect(200);
    //     expect(body.error).to.equal('User already activated')
    //  ;
    // });
    it('should return 404 for invalid activation token', async () => {
      const activationCode = '1234as5errtv';
      const { body } = await request
        .patch('/user/activate')
        .send(activationCode)
        .expect(404);
      expect(body.error).to.equal('activate code is invalid');
    });
    // it('should return 400 for already activated user', async () => {
    //     const activationCode  = 'testing';
    //   const { body } = await request
    //     .patch('/user/activate')
    //     .send(activationCode)
    //     .expect(404);
    //   expect(body.error).to.equal('User already activated');
    // });
  });
});
