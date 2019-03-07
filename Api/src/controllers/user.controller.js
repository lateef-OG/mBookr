/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { User, Role } = require('../models');

const UserController = {
  createUser(req, res) {
    const {
      name,
      phone_number,
      email,
      address,
      password,
    } = req.body;
    let field = [];
    if (!name) {
      field = [...field, { name: 'name field should not be empty' }];
    }
    if (!phone_number) {
      field = [...field, { phone_number: 'phone number field should not be empty' }];
    }
    if (!email) {
      field = [...field, { email: 'email field should not be empty' }];
    }
    if (!address) {
      field = [...field, { address: 'address field should not be empty' }];
    }
    if (!password) {
      field = [...field, { password: 'password field should not be empty' }];
    }
    if (!name || !phone_number || !email || !address || !password) {
      return res.status(422).send({
        error: field,
      });
    }
    return User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(422).send({
            message: 'User already exists.',
          });
        }
        return bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
          return User.create({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            password: hash,
            role_id: req.body.role_id,
          })
            .then(() => res.status(201).json({
              status: 'success',
              message: 'User created successfully.',
            }))
            .catch(error => res.status(400).json({
              error: error.message,
            }));
        });
      });
  },
  login(req, res) {
    User.findOne({ where: { email: req.body.email } }, {
      include: [{
        model: Role,
        as: 'role',
      }],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User doesn\'t exist.',
          });
        }
        return bcrypt.compare(req.body.password, user.dataValues.password, (err, result) => {
          if (err) {
            return res.status(422).json({
              error: 'Password is incorrect',
            });
          }
          if (result) {
            const token = jwt.sign({
              email: user.dataValues.email,
              user_id: user.dataValues.id,
              role_id: user.dataValues.role_id,
            }, 'secret', {
              expiresIn: '1h',
            });
            return res.status(200).json({
              message: 'Login successful',
              role_id: user.dataValues.role_id,
              token,
            });
          }
          return res.status(401).json({
            error: 'Authentication failed',
          });
        });
      });
  },
  deleteUser(req, res) {
    return User
      .findById(req.body.user_id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

export default UserController;
