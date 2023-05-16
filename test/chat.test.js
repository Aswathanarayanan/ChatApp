const request = require('supertest');
const chai = require('chai');
//const { registerUser,authUser} = require('../backend/controller/userController');
const express = require("express");
//const app = express();
const app = require('../backend/index');
const expect = chai.expect;
const userRoutes= require('../backend/routes/userRoutes')

//app.use(express.urlencoded({ extended: false }));
//app.use("/api/user", userRoutes);

//jest --testTimeout = 10000

const defaultUser = {
    name: "TestUser",
    email: "testuser@iiitb.org",
    password: "TestUser@123",
};

const defaultUserLoginTest = {
  email: "testuser@iiitb.org",
  password: "TestUser@123",
};

describe('POST /user', () => {
  it('responds with created', done => {
    const defaultUser = {
    name: "TestUser",
    email: "testuser@iiitb.org",
    password: "TestUser@123",
};
    request(app)
      .post('/api/user')
      .send(defaultUser)
      .expect(201,done);
  });
});
    
// describe('POST /api/user/register', () => {
//     test('responds with JSON array of users', async () => {
//         const config = {
//             headers: {
//                 "Content-type": "application/json",
//             },
//         };
//         const response = await request(registerUser).post('/api/user/register', {
//     name: "TestUser",
//     email: "testuser@iiitb.org",
//     password: "TestUser@123",
// }, config);
//         expect(response.statusCode).toBe(201);
//         expect(response.headers['content-type']).toMatch(/json/);
//         //expect(response.body.email).toEqual("aswathas@iiitb.org");
//         expect(response.body.name).toEqual("TestUser");

//     },8000);
// });

describe('POST /user/login', () => {
    it('responds with JSON array of users', async () => {
        const defaultUserLoginTest = {
            "email": "aswathas@iiitb.org",
            "password": "123456",
            };
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await request(app).post('/api/user/login', defaultUserLoginTest, config);
        expect(200);
        //expect(response.body.email).toEqual("aswathas@iiitb.org");
        //expect(response.body.name).toEqual("Aswathas");

    },8000);
});
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../backend/index");
// const { response } = require("express");
// const User = require("../backend/models/userModel")

// //Assertion style
// chai.should();

// chai.use(chaiHttp);

// let defaultUser = {
//     name: "TestUser",
//     email: "testuser@iiitb.org",
//     password: "TestUser@123",
// };

// let defaultUserLoginTest = {
//   email: "testuser@iiitb.org",
//   password: "TestUser@123",
// };




//         describe('Testing APIs', function() {

//                 it('Should Register user, Login user, Create Token, Getting Global Messages', function(done) {
//                     chai.request(server)

//                         // register request
//                         .post('/api/user/register')
//                         .send(defaultUser)

//                         .end((err, res) => {

//                             // follow up with login
//                             chai.request(server)
//                                 .post('/api/user/login')
//                                 .send(defaultUserLoginTest)
//                                 .end((err, res) => {
//                                     console.log('this runs the login part');
//                                     res.body.should.have.property('token');
//                                     var token = res.body.token;

//                                     // follow up with getting global messages
//                                     chai.request(server)
//                                         .get('/api/messages/global')
//                                                 // we set the auth header with our token
//                                         .set('Authorization', token)
//                                                 .end(function(error, res) {
//                                                     res.should.have.status(200);
//                                                       done();
//                                                 });
//                                         })
//                                 })
//                         })
//                   })



//         describe('Testing APIs', function() {

//                 it('Should Register user, Login user, Create Token, Posting Global Messages', function(done) {
//                     chai.request(server)

//                         // register request
//                         .post('/api/users/register')
//                         .send(defaultUser)
//                         .end((err, res) => {

//                             // follow up with login
//                             chai.request(server)
//                                 .post('/api/users/login')
//                                 .send(defaultUserLoginTest)
//                                 .end((err, res) => {
//                                     res.body.should.have.property('token');
//                                     var token = res.body.token;

//                                     // follow up with getting global messages
//                                     chai.request(server)
//                                         .post('/api/messages/global')
//                                                 // we set the auth header with our token
//                                         .set('Authorization', token)
//                                         .send({
//                                           body: "Mirchi is pagal",
//                                         })

//                                                 .end(function(error, res) {
//                                                     res.body.message.should.be.eq("Success");
//                                                       done();
//                                                 });
//                                         })
//                                 })
//                         })
//                 })

//             describe('Testing APIs', function() {

//                         it('Should Register user, Login user, Create Token, Getting Conversation List', function(done) {
//                             chai.request(server)

//                                 // register request
//                                 .post('/api/user/register')
//                                 .send(defaultUser)

//                                 .end((err, res) => {

//                                     // follow up with login
//                                     chai.request(server)
//                                         .post('/api/user/login')
//                                         .send(defaultUserLoginTest)
//                                         .end((err, res) => {
//                                             console.log('this runs the login part');
//                                             res.body.should.have.property('token');
//                                             var token = res.body.token;

//                                             // follow up with getting global messages
//                                             chai.request(server)
//                                                 .get('/api/message')
//                                                         // we set the auth header with our token
//                                                 .set('Authorization', token)
//                                                         .end(function(error, res) {
//                                                             //console.log(res.body);
//                                                               done();
//                                                         });
//                                                 })
//                                         })
//                                 })
//                           })



//                 describe('Testing APIs', function() {

//                               it('Should Register user, Login user, Create Token, Getting Conversation Messages', function(done) {
//                                           chai.request(server)

//                                               // register request
//                                               .post('/api/user/register')
//                                               .send(defaultUser)

//                                               .end((err, res) => {

//                                                   // follow up with login
//                                                   chai.request(server)
//                                                       .post('/api/user/login')
//                                                       .send(defaultUserLoginTest)
//                                                       .end((err, res) => {
//                                                           res.body.should.have.property('token');
//                                                           var token = res.body.token;

//                                                           // follow up with getting
//                                                           chai.request(server)
//                                                               .get('/api/message/conversations/query')
//                                                                       // we set the auth header with our token
//                                                               .set('Authorization', token)
//                                                               .send({
//                                                                 user2: "608aecb039b2c4c0639bb033",
//                                                               })
//                                                                       .end(function(error, res) {
//                                                                           res.statusCode.should.be.eq(200);
//                                                                             done();
//                                                                       });
//                                                               })
//                                                       })
//                                               })
//                                         })



//                 describe('Testing APIs', function() {

//                               it('Should Register user, Login user, Create Token, Private Conversation Messages', function(done) {
//                                           chai.request(server)

//                                               // register request
//                                               .post('/api/user/register')
//                                               .send(defaultUser)

//                                               .end((err, res) => {

//                                                   // follow up with login
//                                                   chai.request(server)
//                                                       .post('/api/user/login')
//                                                       .send(defaultUserLoginTest)
//                                                       .end((err, res) => {
//                                                           res.body.should.have.property('token');
//                                                           var token = res.body.token;

//                                                           // follow up with getting
//                                                           chai.request(server)
//                                                               .post('/api/message')
//                                                                       // we set the auth header with our token
//                                                               .set('Authorization', token)
//                                                               .send({
//                                                                 to: "608aecb039b2c4c0639bb033",
//                                                                 body: "Final Test case",
//                                                               })
//                                                                       .end(function(error, res) {
//                                                                           res.statusCode.should.be.eq(200);
//                                                                             done();
//                                                                       });
//                                                               })
//                                                       })
//                                               })
//                                         })
                                        