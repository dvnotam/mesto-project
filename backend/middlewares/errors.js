module.exports.checkErrors = (error, req, res, next) => {
  const { message, status } = error;

  res.status(status || 500).send({
    message,
  });
  next();
};
