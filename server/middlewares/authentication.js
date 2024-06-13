const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers, "<<< token saat login");

    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    const [type, token] = bearerToken.split(" ");
    if (type !== "Bearer" || !token) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    const payload = verifyToken(token);
    const userId = payload.id;

    const user = await User.findByPk(userId);
    if (!user) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    req.user = { id: user.id };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
