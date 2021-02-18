const dbConfig = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

/******************** CONTROLLERS ********************/

/* Method to autenticate users using JWT*/
const authUser = async (req, res) => {
  const user = {
    email: "info@yahoo.com",
    password: "123456",
  };
  jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
    res.json({ token });
  });
};

/* Get user lessons by user email */
const getLessons = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await dbConfig("lessons").where("email", email).select("*");
    result
      ? res.status(200).json({ success: true, message: "ok", results: result })
      : res.status(404).json({ message: "No records" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Add new notes to the user lesson */
const addNotes = async (req, res) => {
  const newNote = req.body;
  try {
    const result = await dbConfig("notes").insert(newNote);
    result
      ? res.status(200).json({ success: true, message: "ok" })
      : res.status(400).json({ message: "Error adding note" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Delete a note by ID */
const deleteNotes = async (req, res) => {
  const idNote = req.params.id;
  try {
    const result = await dbConfig("notes").where("id_note", idNote).del();
    result
      ? res.status(200).json({ success: true, message: "ok" })
      : res.status(404).json({ message: "Record not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Update lesson status by lesson ID */
const updateStatus = async (req, res) => {
  const idLesson = req.params.id;
  const newState = req.body.lessonState;
  try {
    const result = await dbConfig("lessons")
      .where("id_lesson", idLesson)
      .update({ lesson_state: newState });
    result
      ? res.status(200).json({ success: true, message: "ok" })
      : res.status(404).json({ message: "Record not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  authUser,
  getLessons,
  addNotes,
  deleteNotes,
  updateStatus,
};
