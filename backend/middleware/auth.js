const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
console.log(
  "middleware/auth.js:",
  NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
);
console.log("environment:",NODE_ENV);
const auth = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  // let's check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer")) {

    return res.status(401).send({ message: "Authorization required" });
  }
  // getting the token
  const token = authorization.replace("Bearer ", "");
  // verifying the token
  let payload;
   try {
    // trying to verify the token
    payload = jwt.verify(
      token,
       NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
   }
   catch (err) {
    console.log("auth catch err");
     // we return an error if something goes wrong
     return res.status(401).send({ message: "Authorization required" });

   }
  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
};
module.exports = auth;
