const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get(`/`, async (req, res) => {
  res.json({ message: "Hello World" });
});

app.post(`/newsletter`, async (req, res) => {
  const { email } = req.body;

  const result = await prisma.newsletter.create({
    data: {
      email,
    },
  });
  res.json(result);
});

app.get("/users", async (req, res) => {
  const users = await prisma.newsletter.findMany();
  res.json(users);
});

module.exports = app;