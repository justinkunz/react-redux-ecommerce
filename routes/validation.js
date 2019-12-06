require("dotenv").config();
const { ADMIN_KEY } = process.env;

/**
 * Validates User is admin for admin protected routes
 * @param {Request Object} req request{} for call
 * @param {Response funct} res response() for sneding unauthorized notiice
 */
module.exports = (req, res) => {
  if (req.headers.authorization !== ADMIN_KEY) {
    res.status(401).send("Unauthorized");
    return false;
  }
  return true;
};
