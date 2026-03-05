const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  company: {
    type: String,
    required: true
  },

  position: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["applied", "interview", "offer", "rejected"],
    default: "applied"
  },

  notes: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Job", JobSchema)