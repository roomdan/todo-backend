exports.ErrorHandler = (error, req, resp, next) => {
  try {
    resp.status(400).json({ message: error.message });
  } catch {
    resp.json({ message: "Internal Server Error" });
  }
};
