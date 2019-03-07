/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import app from '../src/index';
import { User, Meal } from '../src/models';

const { assert } = chai;

chai.use(chaiHttp);
chai.should();

const userData = {
  name: 'user name',
  email: 'user1@email.com',
  phone_number: '098192393',
  address: 'address',
  password: 'password',
  role_id: 1,
};

const catererData = {
  name: 'user name',
  email: 'caterer@email.com',
  phone_number: '098192393',
  address: 'address',
  password: 'password',
  role_id: 2,
};

before((done) => {
  User.create(catererData)
    .then(() => User.create(userData))
    .then(() => {
      done();
    });
});

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
describe('SignUp', () => {
  it('User should be able to signup', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        name: 'user name',
        email: 'user@email.com',
        phone_number: '098192393',
        address: 'address',
        password: 'password',
        role_id: 2,
      })
      .end((err, res) => {
        res.should.have.status(201);
        assert.equal(res.body.message, 'User created successfully.');
        done();
      });
  });
});
describe('Login', () => {
  it('User should be able to login', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'user@email.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.message, 'Login successful');
        done();
      });
  });
});
describe('Meals', () => {
  describe('GET /meals', () => {
    it('should get all meal options', (done) => {
      User.findOne({ where: { email: catererData.email } })
        .then((caterer) => {
          const { user_id, email, role_id } = caterer;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .get('/api/v1/meals')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.message, 'Success');
            });
          done();
        })
        .catch(err => console.log(err.message));
    });
  });
  describe('POST /meals', () => {
    it('should add a meal option', (done) => {
      User.findOne({ where: { email: catererData.email } })
        .then((caterer) => {
          const { user_id, email, role_id } = caterer;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .post('/api/v1/meals')
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Meal')
            .field('price', '500')
            .attach('image', '../UI/img/food-img.jpg', 'test.png')
            .end((err, res) => {
              res.should.have.status(201);
              assert.equal(res.body.message, 'Meal created successfully.');
            });
          done();
        })
        .catch(err => console.log(err.message));
    });
  });
  describe('PUT /meals', () => {
    it('should edit a meal option', (done) => {
      Meal.create({
        name: 'Fake Meal',
        price: 1000,
        image: '../UI/img/food-img.jpg',
      })
        .then((meal) => {
          User.findOne({ where: { email: catererData.email } })
            .then((caterer) => {
              const { user_id, email, role_id } = caterer;
              const token = jwt.sign(
                {
                  email,
                  user_id,
                  role_id,
                },
                'secret',
                {
                  expiresIn: 86400,
                },
              );
              chai.request(app)
                .put(`/api/v1/meals/${meal.id}`)
                .set('Authorization', `Bearer ${token}`)
                .field('name', 'Test Meal')
                .field('price', '500')
                .attach('image', '../UI/img/food-img.jpg', 'test.png')
                .end((err, res) => {
                  res.should.have.status(200);
                  assert.equal(res.body.message, 'Meal successfully updated.');
                });
              done();
            })
            .catch(err => console.log(err.message));
        });
    });
  });
  describe('PUT /meals', () => {
    it('should throw error for wrong meal id', (done) => {
      User.findOne({ where: { email: catererData.email } })
        .then((caterer) => {
          const { user_id, email, role_id } = caterer;
          const mealId = -1;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .put(`/api/v1/meals/${mealId}`)
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test Meal')
            .field('price', '500')
            .attach('image', '../UI/img/food-img.jpg', 'test.png')
            .end((err, res) => {
              res.should.have.status(404);
              assert.equal(res.body.message, 'Meal Not Found');
            });
          done();
        })
        .catch(err => console.log(err.message));
    });
  });
  describe('DELETE /meals', () => {
    it('should delete a meal option', (done) => {
      Meal.create({
        name: 'Fake Meal',
        price: 1000,
        image: '../UI/img/food-img.jpg',
      })
        .then((meal) => {
          User.findOne({ where: { email: catererData.email } })
            .then((caterer) => {
              const { user_id, email, role_id } = caterer;
              const token = jwt.sign(
                {
                  email,
                  user_id,
                  role_id,
                },
                'secret',
                {
                  expiresIn: 86400,
                },
              );
              chai.request(app)
                .delete(`/api/v1/meals/${meal.id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  assert.equal(res.body.message, 'Meal deleted successfully.');
                });
              done();
            })
            .catch(err => console.log(err.message));
        });
    });
  });
  // describe('DELETE /meals', () => {
  //   it('should throw error for wrong meal id', (done) => {
  //     User.findOne({ where: { email: catererData.email } })
  //       .then((caterer) => {
  //         const { user_id, email, role_id } = caterer;
  //         const mealId = -1;
  //         const token = jwt.sign(
  //           {
  //             email,
  //             user_id,
  //             role_id,
  //           },
  //           'secret',
  //           {
  //             expiresIn: 86400,
  //           },
  //         );
  //         chai.request(app)
  //           .delete(`/api/v1/meals/${mealId}`)
  //           .set('Authorization', `Bearer ${token}`)
  //           .end((err, res) => {
  //             res.should.have.status(404);
  //             assert.equal(res.body.message, 'Meal Not Found');
  //           });
  //         done();
  //       })
  //       .catch(err => console.log(err.message));
  //   });
  // });
});

describe('Menu', () => {
  describe('GET /menu', () => {
    it('should get menu for the day', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Success');
          done();
        });
    });
  });
  describe('POST /menu', () => {
    it('should add meal to menu for the day', (done) => {
      Meal.create({
        name: 'Fake Meal',
        price: 1000,
        image: '../UI/img/food-img.jpg',
      })
        .then((meal) => {
          User.findOne({ where: { email: catererData.email } })
            .then((caterer) => {
              const { user_id, email, role_id } = caterer;
              const token = jwt.sign(
                {
                  email,
                  user_id,
                  role_id,
                },
                'secret',
                {
                  expiresIn: 86400,
                },
              );
              chai.request(app)
                .post('/api/v1/menu')
                .set('Authorization', `Bearer ${token}`)
                .send({
                  meal_id: meal.id,
                })
                .end((err, res) => {
                  res.should.have.status(201);
                  assert.equal(res.body.message, 'Meal added successfully.');
                });
            })
            .catch(err => console.log(err.message));
        });
      done();
    });
  });
  describe('DELETE /menu', () => {
    it('should delete a meal from menu for the day', (done) => {
      Meal.create({
        name: 'Fake Meal',
        price: 1000,
        image: '../UI/img/food-img.jpg',
      })
        .then((meal) => {
          const menu_id = parseInt(moment().format('DDMMYYYY'), Number);
          User.findOne({ where: { email: catererData.email } })
            .then((caterer) => {
              const { user_id, email, role_id } = caterer;
              const token = jwt.sign(
                {
                  email,
                  user_id,
                  role_id,
                },
                'secret',
                {
                  expiresIn: 86400,
                },
              );
              chai.request(app)
                .delete('/api/v1/menu')
                .set('Authorization', `Bearer ${token}`)
                .send({
                  meal_id: meal.id,
                  menu_id,
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  assert.equal(res.body.message, 'Meal deleted from menu successfully.');
                });
            })
            .catch(err => console.log(err.message));
        });
      done();
    });
  });
});

describe('Orders', () => {
  describe('GET /orders', () => {
    it('should get all orders', (done) => {
      User.findOne({ where: { email: catererData.email } })
        .then((caterer) => {
          const { user_id, email, role_id } = caterer;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .get('/api/v1/orders')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.message, 'Success');
              done();
            });
        })
        .catch(err => console.log(err.message));
    });
  });
  describe('POST /orders', () => {
    it('should get add an order to orders', (done) => {
      User.findOne({ where: { email: userData.email } })
        .then((user) => {
          const {
            id, user_id, email, role_id, name, phone_number, address,
          } = user;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .post('/api/v1/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
              user_id: id,
              user_name: name,
              user_phone: phone_number,
              user_address: address,
              meals: [
                {
                  meal_id: 5,
                  meal_name: 'yam',
                  meal_price: 200,
                  meal_image: 'test-img.jpg',
                  quantity: 2,
                  meal_total: 400,
                },
              ],
              order_total: 600,
            })
            .end((err, res) => {
              res.should.have.status(201);
              assert.equal(res.body.message, 'Order created successfully.');
              done();
            });
        })
        .catch(err => console.log(err.message));
    });
  });
  describe('PUT /orders', () => {
    it('should edit an order', (done) => {
      User.findOne({ where: { email: catererData.email } })
        .then((user) => {
          const {
            user_id, email, role_id,
          } = user;
          const token = jwt.sign(
            {
              email,
              user_id,
              role_id,
            },
            'secret',
            {
              expiresIn: 86400,
            },
          );
          chai.request(app)
            .put('/api/v1/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
              user_name: 'name',
            })
            .end((err, res) => {
              res.should.have.status(200);
              assert.equal(res.body.message, 'Order updated.');
              done();
            });
        })
        .catch(err => console.log(err.message));
    });
  });
});
after((done) => {
  User.destroy({ where: { email: ['user@email.com', userData.email, catererData.email] } })
    .then(() => {
      done();
    });
});
