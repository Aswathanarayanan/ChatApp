const request = require('supertest');
const app = require('../backend/index'); 
const chai = require('chai');
const expect = chai.expect;

let token;

describe('Register API', () => {
  it('should respond with user details', function (done) {
    this.timeout(5000);
    const userCredentials = {
      name: "TestUser2",
        email: 'testuser2@iiitb.org',
        password: '123456',
    };

    request(app)
      .post('/api/user')
      .send(userCredentials)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assert response body properties
        //expect(res.body).to.have.property('email').equal(userCredentials.email);
        expect(res.body).to.have.property('name');
        // Add more assertions as needed

        done();
      });
  });
});

describe('Login API', () => {
  it('should respond with user details', function (done) {
    this.timeout(5000);
    const userCredentials = {
      email: 'testuser2@iiitb.org',
      password: '123456'
    };

    const res=request(app)
      .post('/api/user/login')
      .send(userCredentials)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assert response body properties
        expect(res.body).to.have.property('email').equal(userCredentials.email);
        expect(res.body).to.have.property('name');
        // Add more assertions as needed
      

        token = res.body.token;
        done();
      });
  });
});

describe('chat API', () => {
  it('should respond with user details', function (done) {
    this.timeout(5000);
    request(app)
      .post('/api/chat')
      .set('Authorization' , `Bearer ${token}`)
      .send({userId:'645b1dfa39b4f34a0881e1d7'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assert response body properties
        //expect(res.body).to.have.property('email').equal(userCredentials.email);
        //expect(res.body).to.have.property('name');
        // Add more assertions as needed

        done();
      });
  });
});
  
let chat;
describe('chat API get chats', () => {
  it('getting chats', function (done) {
    this.timeout(5000);
    const res=request(app)
      .get('/api/chat')
      .set('Authorization' , `Bearer ${token}`)
      .send({userId:'645b1dfa39b4f34a0881e1d7'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        chat = res;
        // Assert response body properties
        //expect(res.body).to.have.property('email').equal(userCredentials.email);
        //expect(res.body).to.have.property('name');
        // Add more assertions as needed

        done();
      });
  });
});
  
describe('chat API rename', () => {
  it('getting chats', function (done) {
    this.timeout(5000);
    request(app)
      .put('/api/chat/rename')
      .set('Authorization' , `Bearer ${token}`)
      .send({chatId: `${chat.body._id}`,chatName: 'newChatTest'})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        // Assert response body properties
        //expect(res.body).to.have.property('email').equal(userCredentials.email);
        //expect(res.body).to.have.property('name');
        // Add more assertions as needed

        done();
      });
  });
  });
    