const mongoose = require("mongoose");

const voteModel = mongoose.Schema(
    {
        voterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        votedFor: { type: String, ref: "Candidate", required: true },
    },
    { timestamps: true }
);

const Vote = mongoose.model("Vote", voteModel);

module.exports = Vote;
