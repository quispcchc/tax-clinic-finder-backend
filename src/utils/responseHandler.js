exports.successResponse = (res, message, data = {}) => {
    res.status(200).json({ success: true, message, data });
  };
  
  exports.errorResponse = (res, message, status = 400) => {
    res.status(status).json({ success: false, message });
};
