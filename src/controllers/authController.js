const authService = require('../services/authService');
const { logger } = require("../config/logger");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
    try {
      const result = await authService.resetPassword(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};
  
exports.resetPasswordWithToken = async (req, res, next) => {
    try {
      const result = await authService.resetPasswordWithToken(req.params.token, req.body.password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};

exports.changePassword = async (req, res, next) => {
  try {

    const {userId} = req.params;
    const { currentPassword, newPassword } = req.body;

    const result = await authService.changePassword(userId, currentPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
