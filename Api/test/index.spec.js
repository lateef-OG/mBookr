/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import MealData from '../src/data/meal-data';
import OrderData from '../src/data/order-data';

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

describe('Menu', () => {
  describe('GET /menu', () => {
    it('should get menu for the day', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('POST /menu', () => {
    it('should create menu for the day', (done) => {
      chai.request(app)
        .post('/api/v1/menu')
        .field('date', 'test date')
        .field('menu', 'meal')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          assert.equal(res.body.message, 'Menu created successfully');
          done();
        });
    });
  });
});

describe('Orders', () => {
  describe('GET /orders', () => {
    it('should get all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
  describe('POST /orders', () => {
    it('should get add an order to orders', (done) => {
      chai.request(app)
        .post('/api/v1/orders')
        .field('customer_name', 'customer name')
        .field('customer_id', 3)
        .field('meal_order', [Array])
        .field('address', 'sample address')
        .field('phone_no', '08123456789')
        .field('total_cost', 1200)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          assert.equal(res.body.status, 'success');
          done();
        });
    });
  });
  describe('PUT /orders', () => {
    it('should edit an order', (done) => {
      const orderId = OrderData.orders[0].id;
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .field('id', 1)
        .field('customer_name', 'customer name')
        .field('customer_id', 3)
        .field('meal_order', [Array])
        .field('address', 'sample address')
        .field('phone_no', '08123456789')
        .field('total_cost', 1200)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.response.data.should.be.a('object');
          assert.equal(res.body.response.status, 'success');
          assert.equal(res.body.response.message, `Order with id: ${orderId} edited successfully.`);
          done();
        });
    });
  });
});
