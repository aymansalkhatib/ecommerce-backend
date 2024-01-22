// This function handles global errors and sends a JSON response
const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    // If the environment is development, include the status code and stack trace
    ...(process.env.NODE_ENV === "development" && {
      statusCode: error.statusCode,
      stack: error.stack,
    }),
  });
};

module.exports = globalError;
