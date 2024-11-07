const express = require("express");
const router = express.Router();
const { getCandidatesList } = require("../controllers/candidateControllers");

router.get("/list", getCandidatesList);

module.exports = router;
