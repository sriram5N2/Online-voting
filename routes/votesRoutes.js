const express = require("express");
const router = express.Router();
const { castVote, voteCount } = require("../controllers/voteControllers");

router.post("/castvote", castVote);
router.get("/votecount", voteCount);

module.exports = router;
