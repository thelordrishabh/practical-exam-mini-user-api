const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];
let nextId = 1;

app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`Request received at: ${currentTime}`);
  console.log(`${req.method} ${req.url}`);
  next();
});

const withTime = (message, extra = {}) => {
  return {
    message,
    time: new Date().toISOString(),
    ...extra,
  };
};

app.get("/", (req, res) => {
  res.status(200).json(withTime("Server Running"));
});

app.get("/users", (req, res) => {
  res.status(200).json(withTime("Operation successful", { users }));
});

app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((entry) => entry.id === userId);

  if (!user) {
    return res.status(404).json(withTime("User not found"));
  }

  return res.status(200).json(withTime("Operation successful", { user }));
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json(withTime("Name and email are required"));
  }

  const duplicateUser = users.find((entry) => entry.email === email);
  if (duplicateUser) {
    return res.status(409).json(withTime("Email already exists"));
  }

  const newUser = {
    id: nextId++,
    name,
    email,
  };
  users.push(newUser);

  return res.status(201).json(withTime("Operation successful", { user: newUser }));
});

app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const targetIndex = users.findIndex((entry) => entry.id === userId);

  if (targetIndex === -1) {
    return res.status(404).json(withTime("User not found"));
  }

  const [deletedUser] = users.splice(targetIndex, 1);
  return res.status(200).json(withTime("Operation successful", { user: deletedUser }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(withTime("All fields required"));
  }

  const isAuthorized = email === "admin@gmail.com" && password === "1234";

  if (!isAuthorized) {
    return res.status(401).json(withTime("Invalid Credentials"));
  }

  return res.status(200).json(withTime("Login Success"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
