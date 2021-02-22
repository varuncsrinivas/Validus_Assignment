//Dependencies
import * as chai from 'chai';
//Environment Variables
import {configEnv} from '../config.env';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

const env = configEnv[process.env.NODE_ENV];

describe('Music Service Songs:', function () {

  describe('Music Service - Get Songs', function () {


      it('Service validation for Songs with bearer Token', function (done) {
      chai.request(env.url)
        .get('/Songs')
          .set("Authorization","Bearer "+env.token)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    })

      it('401 Error Message validation for Negative scenario', function (done) {
          chai.request(env.url)
              .get('/Songs/')
              .end(function (err, res) {
                  res.should.have.status(401);
                  res.should.be.json;
                  done();
              });
      })

      it('Should successfully sort The songs Name In Asc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/songs/?_sort=name,views&_order=asc')
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

      it('Should successfully sort The songs Name In Desc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/songs/?_sort=name,views&_order=Desc')
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
                  chai.assert.isTrue(compareTwoArrayRes,'Sorting Order Does not Matches for songs Name')
                  done();
              });
      })

      it('Should successfully sort The Tracks In Asc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/songs/?_sort=track,views&_order=asc')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  for (let indx in result) {
                      originalResultOrder.push(result[indx].track)
                  }
                  for (let indx in result) {
                      customisedSortedOrder.push(result[indx].track)
                  }
                  customisedSortedOrder.sort(function(a, b){return a - b});
                  var compareTwoArrayRes = originalResultOrder.length == customisedSortedOrder.length && originalResultOrder.every(function(element, index) {
                      return element === customisedSortedOrder[index];
                  });
                  chai.assert.isTrue(compareTwoArrayRes,'Sorting Order Does not Matches for track in asc order')
                  done();
              });
      })

      it('Should successfully sort The Tracks In Desc Order', function (done) {
          let  originalResultOrder=[];
          let  customisedSortedOrder=[];
          chai.request(env.url)
              .get('/songs/?_sort=track,views&_order=Desc')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  for (let indx in result) {
                      originalResultOrder.push(result[indx].track)
                  }
                  for (let indx in result) {
                      customisedSortedOrder.push(result[indx].track)
                  }
                  customisedSortedOrder.sort(function(a, b){return b - a});
                  var compareTwoArrayRes = originalResultOrder.length == customisedSortedOrder.length && originalResultOrder.every(function(element, index) {
                      return element === customisedSortedOrder[index];
                  });
                  chai.assert.isTrue(compareTwoArrayRes,'Sorting Order Does not Matches for track Name in Desc order')
                  done();
              });
      })

      it('Pagination_Test Validate Default 10 rows of data should be shown on a page at a time Songs service', function (done) {
          let  pageNum=1;
          chai.request(env.url)
              .get('/songs/?_page='+pageNum)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,10,'Default 10 Results not displayed')
                  done();
              });
      })

      it('Pagination_Test Validate Rows of data is user configurable for Songs service', function (done) {
          let limitsize=7;
          chai.request(env.url)
              .get('/songs/?_page=1&_limit='+limitsize)
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result.length,limitsize,'Limit size Results not matches')
                  done();
              });
      })

      it('Test- Pagination should be quick and easy for the users for Songs service', function (done) {
          chai.request(env.url)
              .get('/songs/?_page=2')
              .set("Authorization","Bearer "+env.token)
              .end(function (err, res) {
                  let result= res.body
                  res.should.have.status(200);
                  res.should.be.json;
                  chai.assert.equal(result[0].id,11,'Pagination results validation for Songs service')
                  done();
              });
      })
  });

});


