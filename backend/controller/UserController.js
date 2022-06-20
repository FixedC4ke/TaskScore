const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const knex = require("../config/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

async function register(req, res) {
  let username = req.body.username;
  let unencryptedPass = req.body.password;
  let role = req.body.role;
  if (!username || !unencryptedPass || !role || role == 15) {
    return res.send({ error: "Некорректный запрос" });
  }
  let existingUser = await knex("users").where({ username: username });
  let userAlreadyExists = existingUser.length > 0 ? true : false;
  if (userAlreadyExists) {
    return res
      .status(409)
      .send({ error: "Пользователь с таким именем уже существует" });
  } else {
    let id = uuid();
    let salt = await bcrypt.genSalt(10);
    let pwdhash = await bcrypt.hash(unencryptedPass, salt);
    knex("users")
      .returning("id", "username", "role")
      .insert({
        id: id,
        username: username,
        passhash: pwdhash,
        role: role,
      })
      .then((inserted) => {
        let token = jwt.sign(inserted[0], JWT_SECRET);
        return res.send(token);
      });
  }
}

async function login(req, res) {
  let payload = {
    id: req.user.id,
    username: req.user.username,
    role: req.user.role,
  };
  let token = jwt.sign(payload, JWT_SECRET);
  return res.send(token);
}

module.exports = { register, login };
