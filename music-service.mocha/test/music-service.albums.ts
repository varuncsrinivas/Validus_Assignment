//Dependencies
import * as chai from 'chai';
//Environment Variables
import {configEnv} from '../config.env';
import chaiHttp = require('chai-http');
import expect, {assert} from "expect";

chai.use(chaiHttp);
const should = chai.should();

const env = configEnv[process.env.NODE_ENV];

describe('Music Service Albums:', function () {

  describe('Music Service - Get Albums', function () {
    
    it('Service validation for albums with bearer Token', function (done) {
      chai.request(env.url)
        .get('/albums/')
          .set("Authorization","Bearer "+env.token)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    })

      it('401 Error Message validation for Negative scenerio', function (done) {
          chai.request(env.url)
              .get('/albums/')
              .end(function (err, res) {
                  res.should.have.status(401);
                  res.should.be.json;
                  done();
              });
      })

      it('Should successfully sort The Album Name In Asc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/albums/?_sort=name,views&_order=asc')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  for (let indx in result) {
                      originalResultOrder.push(result[indx].name)
                  }
                  for (let indx in result) {
                      customisedSortedOrder.push(result[indx].name)
                  }
                  customisedSortedOrder.sort()
                  var compareTwoArrayRes = originalResultOrder.length == customisedSortedOrder.length && originalResultOrder.every(function(element, index) {
                      return element === customisedSortedOrder[index];
                  });
                  chai.assert.isTrue(compareTwoArrayRes,'Sorting Order Doesnot Matches')
                  done();
              });
      })

      it('Should successfully sort The Album Name In Desc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/albums/?_sort=name,views&_order=Desc')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  for (let indx in result) {
                      originalResultOrder.push(result[indx].name)
                  }
                  for (let indx in result) {
                      customisedSortedOrder.push(result[indx].name)
                  }
                  customisedSortedOrder.sort().reverse()
                  var compareTwoArrayRes = originalResultOrder.length == customisedSortedOrder.length && originalResultOrder.every(function(element, index) {
                      return element === customisedSortedOrder[index];
                  });
                  chai.assert.isTrue(compareTwoArrayRes,'Sorting Order Doesnot Matches')
                  done();
              });
      })

      it('Should successfully filter By Album Name', function (done) {
          let  albumName="Animals";
          chai.request(env.url)
              .get('/albums/?title=json-server&name='+albumName)
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

      it('Pagination_Test Validate Default 10 rows of data should be shown on a page at a time', function (done) {
          let  pageNum=1;
          chai.request(env.url)
              .get('/albums/?_page='+pageNum)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,10,'Default 10 Results not displayed')
                  done();
              });
      })

      it('Pagination_Test Validate Rows of data is user configurable for Album service', function (done) {
          let limitsize=4;
          chai.request(env.url)
              .get('/albums/?_page=1&_limit='+limitsize)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,limitsize,'Limit size Results not matches')
                  done();
              });
      })

      it('Test- Pagination should be quick and easy for the users for albums service', function (done) {
          chai.request(env.url)
              .get('/albums/?_page=2')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result[0].id,11,'Pagination results validation for albums service')
                  done();
              });
      })
  });


});


