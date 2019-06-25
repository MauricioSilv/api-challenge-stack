const express = require("express"); //import express

const app = express();

//Enabling json
app.use(express.json());

const projects = [];

//middlewares
//Global
let count = 0;

app.use((req, res, next) => {
  count++;
  console.log(`Number for request ${count}`);

  return next();
});

//middleware checking route parameters
function checkIdParams(req, res, next) {
  const { id } = req.params;
  if (!projects[id]) {
    return res.status(400).json({ error: "id project not found" });
  }

  return next();
}

//Routes
app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({ id, title });

  return res.json(projects);
});

app.post("/projects/:id/tasks", checkIdParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { tasks } = req.body;

  projects[id].title = title;
  projects[id].tasks = [tasks];

  return res.json(projects);
});

app.put("/projects/:id", checkIdParams, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

app.delete("/projects/:id", checkIdParams, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send("Deleting success!");
});

app.listen(3000);
