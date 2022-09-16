const allowedCors = [
  "https://api.nuriya.students.nomoredomainssbs.ru",
  "https://nuriya.students.nomoredomainssbs.ru",
  "https://www.nuriya.students.nomoredomainssbs.ru",
  "localhost:3000"
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
