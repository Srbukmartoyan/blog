const handleServiceError = (err) => {
  let statusCode = 500; 

  if (err.name === 'SequelizeValidationError') {
    statusCode = 400; 
  } else if (err.message === 'Post not found') {
    statusCode = 404; 
  }
  const error = new Error(err.message);
  error.status = statusCode;
  throw error;
};

const checkRequiredFields = (reqBody, requiredFields) => {
  for (const field of requiredFields) {
    if (!(field in reqBody)) {
      return { statusCode: 400, message: `Missing required field` };
    }
  }
  return false;
}

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ error: message });
};

module.exports = {errorHandler, handleServiceError, checkRequiredFields};