const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({

company: {
type: String,
required: true
},

position: {
type: String,
required: true
},

location: {
type: String,
default: ""
},

status: {
type: String,
enum: ["applied", "interview", "offer", "rejected"],
default: "applied"
},

createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
}

}, { timestamps: true })

module.exports = mongoose.model("Job", JobSchema)
