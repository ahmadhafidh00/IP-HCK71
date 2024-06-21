const errorHandler = (err, req, res, next) => {
  console.log(err, "<<< error di handler");
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "InvalidLogin":
      res.status(400).json({ message: err.message });
      break;
    case "InvalidInput":
      res.status(400).json({ message: err.message });
      break;
    case "Unauthorized":
      res.status(401).json({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "NotFound":
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
