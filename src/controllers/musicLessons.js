const dbConnection = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");

/******************** CONTROLLERS ********************/

/* Method to autenticate users using JWT*/
const authUser = async (req, res) => {
  const user = req.body;
  try {
    const result = await dbConnection("users").where(user).select("*");
    result.length !== 0
      ? jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
          res.json({ token });
        })
      : res.status(404).json({ message: "Invalid user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Get user lessons by user email */
const getLessons = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await dbConnection("users")
      .join("users_lessons", "users.email", "=", "users_lessons.email")
      .join("lessons", "users_lessons.id_lesson", "=", "lessons.id_lesson")
      .join("states", "users_lessons.id_state", "=", "states.id_state")
      .where("users.email", "=", email)
      .select("lessons.title", "lessons.description", "states.state_name");
    result
      ? res.status(200).json({ results: result })
      : res.status(404).json({ message: "No records" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Add new notes to the user lesson */
const addNotes = async (req, res) => {
  const idUserLesson = req.params.id;
  const newNote = req.body.note;
  try {
    const result = await dbConnection("notes").insert({
      note: newNote,
      id_user_lessons: idUserLesson,
    });
    result
      ? res.status(200).json({ success: true, message: "ok" })
      : res.status(400).json({ message: "Error adding note" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Get notes by lesson */
const getNotes = async (req, res) => {
  const idUserLesson = req.params.id;
  try {
    const result = await dbConnection("users_lessons")
      .join("lessons", "users_lessons.id_lesson", "=", "lessons.id_lesson")
      .join(
        "notes",
        "users_lessons.id_user_lessons",
        "=",
        "notes.id_user_lessons"
      )
      .where("users_lessons.id_user_lessons", "=", idUserLesson)
      .select("notes.id_note", "notes.note");
    result.length !== 0
      ? res.status(200).json({ results: result })
      : res.status(400).json({ message: "No records" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* Delete a note by ID */
const deleteNotes = async (req, res) => {
  const idNote = req.params.id;
  try {
    const result = await dbConnection("notes").where("id_note", idNote).del();
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
  const idUserLesson = req.params.id;
  const newState = req.body.id_state;
  try {
    const result = await dbConnection("users_lessons")
      .where("id_user_lessons", idUserLesson)
      .update({ "id_state": newState });
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
  getNotes,
  addNotes,
  deleteNotes,
  updateStatus,
};
