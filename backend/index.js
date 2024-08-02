const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require("mysql2");
const cors = require("cors");

const db = require("./models");
const { User } = require("./models");
const { Publication } = require("./models");

//Middleware for cors and json parsing
app.use(cors());
app.use(express.json());

//Routes

//Create a new user (extra)
app.post("/users", async (req, res) => {
  const { email, first_name, last_name } = req.body;
  try {
    const user = await User.create({ email, first_name, last_name });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all students
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});

//Create new publication entry for specified student
app.post("/publications", async (req, res) => {
  const { student_id, title, year } = req.body; //getting new data from req
  try {
    const student = await User.findByPk(student_id); //check if student exists
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }
    const publication = await Publication.create({ student_id, title, year });
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all publications w/ student info
app.get("/publications", async (req, res) => {
  try {
    const publications = await Publication.findAll({
      include: [{ model: User, as: "student" }],
    });
    res.json(publications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update existing publication entry info
app.put("/publications/:id", async (req, res) => {
  const { id } = req.params;
  const { title, year } = req.body;
  try {
    const publication = await Publication.findByPk(id);
    if (publication) {
      publication.title = title;
      publication.year = year;
      await publication.save();
      res.json(publication);
    } else {
      res.status(404).json({ error: "Publication not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete publication entry by ID
app.delete("/publications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Publication.destroy({ where: { id } });
    if (result) {
      res.json({ message: "Publication deleted" });
    } else {
      res.status(404).json({ error: "Publication not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
  });
});
