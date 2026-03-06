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

  status: {
    type: String,
    enum: ["Applied", "Interview", "Rejected", "Offer"],
    default: "Applied"
  },

  location: {
    type: String,
    default: "Remote"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Job", JobSchema)