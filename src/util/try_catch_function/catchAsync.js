module.exports = (fn) => {
  return (req, resp, next) => {
    fn(req, resp, next).catch(next);
  };
};
//equal to try and catch