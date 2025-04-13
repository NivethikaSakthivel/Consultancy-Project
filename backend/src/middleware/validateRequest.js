module.exports = (fields) => {
    return (req, res, next) => {
      for (const field of fields) {
        if (!req.body[field]) {
          return res.status(400).send({ message: `${field} is required.` });
        }
      }
      next();
    };
  };
  