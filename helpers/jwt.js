const jwt = require("jsonwebtoken");

const generaJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo general el JWT: ", err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generaJWT,
};
