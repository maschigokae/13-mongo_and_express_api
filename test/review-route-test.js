'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const BEV = require('../model/bev.js');
const Review = require('../model/review.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleReview = {
  title: 'test review',
  authorName: 'Joe',
  reviewText: 'test review text',
  rating: 8,
};

const exampleVehicle = {
  vehicle: 'test vehicle',
  info: 'test info',
  msrp: 35000,
  range: 200,
  mpge: 100,
  lastupdated: new Date()
};


describe('Review Routes', function() {
  describe('POST: /api/bev/:vehicleID/review', function() {
    describe('with a valid \'vehicle\' object and body', () => {
      before( done => {
        new BEV(exampleVehicle).save()
        .then( vehicle => {
          this.tempVehicle = vehicle;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          BEV.remove({}),
          Review.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return data for a vehicle', done => {
        request.post(`${url}/api/bev/${this.tempVehicle._id}/review`)
        .send(exampleReview)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleReview.name);
          expect(res.body.vehicleID).to.equal(this.tempVehicle._id.toString());
          done();
        });
      });
    });
  });
});