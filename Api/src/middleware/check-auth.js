/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

const checkAuth = {
  all(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret');
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'User not authorized',
      });
    }
  },
  customer(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret');
      req.userData = decoded;
      if (req.userData.role_id !== 1) {
        return res.status(401).json({
          message: 'User not authorized',
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'User not authorized',
      });
    }
  },
  customer(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret');
      req.userData = decoded;
      if (req.userData.role_id !== 1) {
        return res.status(401).json({
          message: 'User not authorized',
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'User not authorized',
      });
    }
  },
  caterer(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secret');
      req.userData = decoded;
      if (req.userData.role_id !== 2) {
        return res.status(401).json({
          message: 'User not authorized',
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'User not authorized',
      });
    }
  },
};

export default checkAuth;
