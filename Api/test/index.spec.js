/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import MealData from '../src/data/meal-data';
import OrderData from '../src/data/order-data';
import orderData from '../src/data/order-data';

const { assert } = chai;

chai.use(chaiHttp);
chai.should();
describe('Welcome', () => {
  it('should return a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        assert.equal(res.body.message, 'Welcome to mBookr API');
        done();
      });
  });
});
describe('Not Found', () => {
  it('should return error message for non-existent endpoint', (done) => {
    chai.request(app)
      .get('/random')
      .end((err, res) => {
        res.should.have.status(404);
        assert.equal(res.body.error.message, 'Not found');
        done();
      });
  });
});
describe('Internal server error', () => {
  it('should return error message', (done) => {
    chai.request(app)
      .get('/api/v1/meals/error')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
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
  describe('PUT /meals', () => {
    it('should throw error for wrong meal id', (done) => {
      const mealId = MealData.meals[MealData.meals.length - 1].id + 1;
      chai.request(app)
        .put(`/api/v1/meals/${mealId}`)
        .field('name', 'Test Meal')
        .field('price', '500')
        .attach('image', '../UI/img/food-img.jpg', 'test.png')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.response.status, 'error');
          assert.equal(res.body.response.message, `Meal with id: ${mealId} not found.`);
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
  describe('DELETE /meals', () => {
    it('should throw error for wrong meal id', (done) => {
      const mealId = MealData.meals[MealData.meals.length - 1].id + 1;
      chai.request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.response.status, 'error');
          assert.equal(res.body.response.message, `Meal with id: ${mealId} not found.`);
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
  describe('PUT /orders', () => {
    it('should throw error for wrong meal id', (done) => {
      const orderId = OrderData.orders[OrderData.orders.length - 1].id + 1;
      chai.request(app)
        .put(`/api/v1/orders/${orderId}`)
        .field('customer_name', 'customer name')
        .field('customer_id', 3)
        .field('meal_order', [Array])
        .field('address', 'sample address')
        .field('phone_no', '08123456789')
        .field('total_cost', 1200)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.response.status, 'error');
          assert.equal(res.body.response.message, `Order with id: ${orderId} not found.`);
          done();
        });
    });
  });
});
