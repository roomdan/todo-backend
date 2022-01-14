exports.ErrorHandler = (error, req, resp, next) => {
  try {
    resp.status(error.status).json(error);
  } catch {
    resp.status(500).json({ message: "Internal Server Error", status: 500 });
  }
};
