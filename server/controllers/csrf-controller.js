require("dotenv").config();

const { doubleCsrf } = require("csrf-csrf");

const doubleCsrfConfig = {
  getSecret: () => process.env.CSRF_SECRET, // A function that optionally takes the request and returns a secret
};

const { generateToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfConfig);

const generateCsrfToken = (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
};

module.exports = {
  generateCsrfToken,
  doubleCsrfProtection,
};
