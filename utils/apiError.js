// @desc this class is responsible about opration errors (error that i can predict)
class ApiError extends Error
{
  constructor(message, statusCode) {
    super(message);
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
module.exports = ApiError;
