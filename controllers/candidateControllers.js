const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModel");
const generateToken = require("../config/generateToken");

const getCandidatesList = asyncHandler(async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.send(candidates);
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error(error.message);
    }
});

// const authCandidate = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const currentCandidate = await Candidate.findOne({ email });
//     if (currentCandidate && (await currentCandidate.matchPassword(password))) {
//         res.json({
//             _id: currentCandidate._id,
//             name: currentCandidate.name,
//             email: currentCandidate.email,
//             allianceName: currentCandidate.allianceName,
//             token: generateToken(currentCandidate._id),
//         });
//     } else {
//         res.status(401);
//         throw new Error("Check your login credentials");
//     }
// });

// const registerCandidate = asyncHandler(async (req, res) => {
//     const { name, email, password, allianceName } = req.body;
//     if (!name || !email || !password || !allianceName) {
//         res.status(400);
//         throw new Error("Enter all the fields");
//     }
//     const candidateExists = await Candidate.findOne({ email });
//     if (candidateExists) {
//         res.status(400);
//         throw new Error("User exists");
//     }
//     const newCandidate = await Candidate.create({
//         name,
//         email,
//         password,
//         allianceName,
//     });
//     if (newCandidate) {
//         res.status(201).json({
//             _id: newCandidate._id,
//             name: newCandidate.name,
//             email: newCandidate.email,
//             allianceName: newCandidate.allianceName,
//             token: generateToken(newCandidate._id),
//         });
//     } else {
//         res.status(400);
//         throw new Error("Failed to create user");
//     }
// });

module.exports = { getCandidatesList };
