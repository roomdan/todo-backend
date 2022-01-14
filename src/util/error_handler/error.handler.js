const dotenv = require("dotenv");
dotenv.config();

class ErrorApp extends Error {
  "use strict";
  constructor(message, code) {
    super();
    this.status = code;
    this.message = message;
  }

  Error() {
    const errorObj = {
      message: this.message,
      status: this.status,
      name: this.name,
    };
    if (process.env.NODE_ENV === "development") {
      errorObj.stack = this.stack;
    }

    return errorObj;
  }
}

module.exports = ErrorApp;
