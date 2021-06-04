class ErrorHandler extends Error {
    constructor(statusCode, message, stack) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.stack = stack;
    }
}

const handleError = (err, res) => {
    const { statusCode, message, stack } = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      stack
    });
};

module.exports = {
    ErrorHandler,
    handleError
}