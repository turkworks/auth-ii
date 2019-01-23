require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

function generateToken(user) {
  const payload = {
    username: user.username,
    name: user.name
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

function lock(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid token " });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

server.get("/", (req, res) => {
  res.send("server is alive, now make it secret and safe");
});

server.post("/api/register", (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 14);
  userInfo.password = hash;

  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.post("/api/login", (req, res) => {
  const cred = req.body;

  db("users")
    .where({ username: ClientRectList.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ you: "shall not pass, human!" });
      }
    })
    .catch(err => res.status(500).json({ message: "login failed" }));
});

server.get("/users", lock, async (req, res) => {
  const users = await db("users".select("id", "username"));

  res.status(200).json({ users, decodedToken: req.decodedToken });
});
module.exports = server;
