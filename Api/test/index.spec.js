/* eslint-disable no-undef */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index';
import Meals from '../src/data/meal-data';

const { assert, expect, use, should } = chai;

use(chaiHTTP);

const apiBase = '/api/v1';

const getMeals = () => {
  return Meals;
};

const entry = {
  name: 'test name',
  price: 150,
  image: 'image.png',
};

describe('Meal Endpoints', () => {
  it(`GET ${apiBase}/meals/ - Fetch All Meals`, (done) => {
    chai
      .request(app)
      .get('/api/v1/meals')
      .end((err, res) => {
        res.should.have.status(200);
        res.data.should.be.a('array');
        done();
      });
  });
});
