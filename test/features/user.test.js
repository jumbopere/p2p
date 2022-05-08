import { describe, it, expect, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import fakerUser from '../authHelper';

const request = supertest.agent('http://localhost:4000');

describe('user controllers test', () => {
    it("should get all users", async () => {
        const { body } = await request.get("/user/admin/users").expect(404);
    
        expect(body.message).to.equal("you are trying to access an unknown route");
      });
  describe('Registering a new user', () => {
    it('returns 201 response on successful user registration', () => {
      request
        .post('/user/register')
        .send(fakerUser.user)
        .expect(200)
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
        });
    });
    it('returns (409 error) for duplicate email', (done) => {
        request
          .post('/v1/user/register')
          .send(fakerUser.user)
          .end((err, res) => {
            expect(res.body.status).to.equal(409);
            done();
          });
      });
  });
  
  describe('Login a user', () => {
    it('returns 200 with complete parameters', () => {
      request
        .post('user/login')
        .send(fakerUser.user)
        .end((err, res) => {
          if (err) return (err);
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('returns 401 if password is not given', (done) => {
      request
        .post('/user/login')
        .send(fakerUser.wrongUser3)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('returns 401 error if email is not given', () => {
      request
        .post('/user/login')
        .send(fakerUser.wrongUser2)
        .end((err, res) => {
          if (err) return (err);
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('returns (400 error) for invalid email format', (done) => {
      request
        .post('/user/login')
        .send({
          email: 'test',
          username: 'testusername3',
          password: 'testpassword',
          phone: '07069473974'
        })
        .end((err, res) => {
          if (err) return (err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
