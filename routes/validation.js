require("dotenv").config();
const { ADMIN_KEY } = process.env;

module.exports = (req, res) => {
  if (req.headers.authorization !== ADMIN_KEY) {
    res.status(401).send("Unauthorized");
    return false;
  }
  return true;
};
