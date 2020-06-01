import express from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("lista de users");
  // res.send("Resposta ao user");

  res.json(["jose", "artur", "diego", "asd"]);
});

app.listen(3333);
