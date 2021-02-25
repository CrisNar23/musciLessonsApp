const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/auth");
const {
  authUser,
  getLessons,
  getNotes,
  addNotes,
  deleteNotes,
  updateStatus,
} = require("../controllers/musicLessons");

/******************** ROUTES ********************/

/* Route to authenticate users */
router.post("/login", authUser);

/* Route to get user lessons by email */
router.get("/get-lessons/:email", verifyToken, getLessons);

/* Route to add new notes to the user lesson */
router.post("/add-notes/:id", verifyToken, addNotes);

/* Route to get notes by lessons */
router.get("/get-notes/:id", verifyToken, getNotes);

/* Route to delete notes by ID */
router.delete("/delete-notes/:id", verifyToken, deleteNotes);

/* Route to update status by lesson ID */
router.put("/update-status/:id", verifyToken, updateStatus);

module.exports = router;
