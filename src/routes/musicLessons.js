const { Router } = require("express");
const router = Router();
const verifyToken = require("../middleware/auth");
const {
  authUser,
  getLessons,
  addNotes,
  deleteNotes,
  updateStatus,
} = require("../controllers/musicLessons");

/******************** ROUTES ********************/

/* Route to authenticate users */
router.post("/login", authUser);

/* Route to get user lessons by email */
router.get("/getLessons/:email", verifyToken, getLessons);

//Validar porque necesita saber cual es la lección
/* Route to add new notes to the user lesson */
router.post("/addNotes", verifyToken, addNotes);

//Validar porque necesita saber cual es la lección
/* Route to delete notes by ID */
router.delete("/deleteNotes/:id", verifyToken, deleteNotes);

/* Route to update status by lesson ID */
router.put("/updateStatus/:id", verifyToken, updateStatus);

module.exports = router;
