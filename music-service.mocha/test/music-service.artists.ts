//Dependencies
import * as chai from 'chai';
//Environment Variables
import {configEnv} from '../config.env';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

const env = configEnv[process.env.NODE_ENV];

describe('Music Service Artists:', function () {

  describe('Music Service - Get Artists', function () {

    it('Service validation for Artists with bearer Token', function (done) {
      chai.request(env.url)
        .get('/Artists')
          .set("Authorization","Bearer "+env.token)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    })

      it('401 Error Message validation for Negative scenario', function (done) {
          chai.request(env.url)
              .get('/Artists/')
              .end(function (err, res) {
                  res.should.have.status(401);
                  res.should.be.json;
                  done();
              });
      })

      it('Should successfully filter By Artists Name', function (done) {
          let  albumName="Pink Floyd";
          chai.request(env.url)
              .get('/artists/?title=json-server&name='+albumName)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  for (let indx in result) {
                      chai.assert.isTrue(result[indx].name===albumName,'Album Name Filter Not working as expected')
                  }
                  done();
              });
      })

      it('Pagination_Test Validate Default 10 rows of data should be shown on a page at a time for artists Services', function (done) {
          let  pageNum=1;
          chai.request(env.url)
              .get('/artists/?_page='+pageNum)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,10,'Default 10 Results not displayed')
                  done();
              });
      })

      it('Pagination_Test Validate Rows of data is user configurable for Artists service', function (done) {
          let limitsize=4;
          chai.request(env.url)
              .get('/artists/?_page=1&_limit='+limitsize)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,limitsize,'Limit size Results not matches')
                  done();
              });
      })

      it('Test- Pagination should be quick and easy for the users for artists service', function (done) {
          chai.request(env.url)
              .get('/artists/?_page=2')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result[0].id,11,'Pagination results validation for artists service')
                  done();
              });
      })

  });

});


