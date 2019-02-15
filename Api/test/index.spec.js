/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import MealData from '../src/data/meal-data';

const { assert } = chai;

chai.use(chaiHttp);
chai.should();
describe('Meals', () => {
  describe('GET /meals', () => {
    it('should get all meal options', (done) => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST /meals', () => {
    it('should get add a meal option', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .field('name', 'Test Meal')
        .field('price', '500')
        .attach('image', '../UI/img/food-img.jpg', 'test.png')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          done();
        });
    });
  });
  describe('PUT /meals', () => {
    it('should edit a meal option', (done) => {
      const mealId = MealData.meals[0].id;
      chai.request(app)
        .put(`/api/v1/meals/${mealId}`)
        .field('name', 'Test Meal')
        .field('price', '500')
        .attach('image', '../UI/img/food-img.jpg', 'test.png')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.response.status, 'success');
          assert.equal(res.body.response.message, `Meal with id: ${mealId} edited successfully.`);
          done();
        });
    });
  });
  describe('DELETE /meals', () => {
    it('should delete a meal option', (done) => {
      const mealId = MealData.meals[0].id;
      chai.request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.response.status, 'success');
          assert.equal(res.body.response.message, `Meal with id: ${mealId} deleted successfully.`);
          done();
        });
    });
  });
});
