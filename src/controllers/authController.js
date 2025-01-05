const authService = require('../services/authService');

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

// Reset Password Request - Sends a reset email
exports.resetPassword = async (req, res, next) => {
    try {
      const result = await authService.resetPassword(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};
  
// Reset Password with Token - Handles resetting password using the token
exports.resetPasswordWithToken = async (req, res, next) => {
    try {
      const result = await authService.resetPasswordWithToken(req.params.token, req.body.password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};
