module.exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log detailed stack trace
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
