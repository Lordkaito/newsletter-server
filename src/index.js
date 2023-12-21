const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get(`/`, async (req, res) => {
  res
    .header("Access-Control-Allow-Origin", "*")
    .json({ message: "Hello World" });
});

app.post(`/newsletter`, async (req, res) => {
  const { email } = req.body;

  const result = await prisma.newsletter.create({
    data: {
      email,
    },
  });
  res.header("Access-Control-Allow-Origin", "*").json(result);
});

app.get("/users", async (req, res) => {
  // for now, we count users instead of showing them
  const users = await prisma.newsletter.count();
  console.log(users);
  res.header("Access-Control-Allow-Origin", "*").json(users);
});

app.use((req, res, next) => {
  if (req.path !== "/" && req.path !== "/newsletter" && req.path !== "/users") {
    return res.status(404).json({ error: "Ruta no encontrada" });
  }
  next();
});

module.exports = app;
// app.listen(3000, () => console.log("Server on port 3000"));
