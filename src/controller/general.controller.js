exports.GeneralController = (req, res, next) => {
  res.status(400).json({
    message: "This route is not defined",
    typeError: `The path defined for this route is not exist, plese verify app documentation.`,
    url: req.url,
  });
};
