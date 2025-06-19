const express = require("express");
const jwt = require("jsonwebtoken");
const jwtpassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "blake@gmail.com",
    password: "123",
    name: "blake  singh",
  },
  {
    username: "ram@gmail.com",
    password: "123",
    name: "ram singh",
  },
];

function userExists(username, password) {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username === username &&
      ALL_USERS[i].password === password
    ) {
      return true;
    }
  }
  return false;
}

app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory DB",
    });
  }

  const token = jwt.sign({ username }, jwtpassword);
  return res.json({ token });
});


//the app sever for getting the users data after pasting the jwt in the aurthorization header

app.get("/users", function (req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;

    const filteredUsers = ALL_USERS.filter(
      (user) => user.username !== username,
    );

    res.json({ users: filteredUsers });
  } catch (err) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
});

app.listen(3000);
