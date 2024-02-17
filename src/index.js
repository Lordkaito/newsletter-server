const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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
  const users = await prisma.newsletter.count();
  console.log(users);
  res.json(users);
});

app.use((req, res, next) => {
  if (req.path !== "/" && req.path !== "/newsletter" && req.path !== "/users") {
    return res.status(404).json({ error: "Ruta no encontrada" });
  }
  next();
});

// module.exports = app;

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
})

export default app;