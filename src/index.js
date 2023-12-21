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
  const users = await prisma.newsletter.findMany();
  res.header("Access-Control-Allow-Origin", "*").json(users);
});

app.use((req, res, next) => {
  if (req.path !== "/" && req.path !== "/newsletter" && req.path !== "/users") {
    return res.status(404).json({ error: "Ruta no encontrada" });
  }
  next();
});

module.exports = app;
