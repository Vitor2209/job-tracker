const Job = require("../models/Job")

// ============================
// CREATE JOB
// ============================
exports.createJob = async (req, res) => {
  try {

    const { company, position, location, status } = req.body

    const job = new Job({
      company: company,
      position: position,
      location: location,
      status: status,
      createdBy: req.user.id
    })

    const savedJob = await job.save()

    res.status(201).json(savedJob)

  } catch (error) {

    console.log("CREATE JOB ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}


// ============================
// GET ALL JOBS
// ============================
exports.getJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      createdBy: req.user.id
    }).sort({ createdAt: -1 })

    res.status(200).json({
      count: jobs.length,
      jobs
    })

  } catch (error) {

    console.error("GET JOBS ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}


// ============================
// GET SINGLE JOB
// ============================
exports.getJob = async (req, res) => {
  try {

    const job = await Job.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    })

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    res.status(200).json(job)

  } catch (error) {

    console.error("GET JOB ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}


// ============================
// UPDATE JOB
// ============================
exports.updateJob = async (req, res) => {
  try {

    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    res.status(200).json(job)

  } catch (error) {

    console.error("UPDATE JOB ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}


// ============================
// DELETE JOB
// ============================
exports.deleteJob = async (req, res) => {
  try {

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    })

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    res.status(200).json({
      message: "Job deleted successfully"
    })

  } catch (error) {

    console.error("DELETE JOB ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}


// ============================
// JOB STATS
// ============================
exports.getStats = async (req, res) => {
  try {

    const jobs = await Job.find({
      createdBy: req.user.id
    })

    const stats = {
      applications: jobs.length,
      interviews: jobs.filter(j => j.status === "interview").length,
      offers: jobs.filter(j => j.status === "offer").length,
      rejected: jobs.filter(j => j.status === "rejected").length
    }

    res.status(200).json(stats)

  } catch (error) {

    console.error("STATS ERROR:", error)

    res.status(500).json({
      message: error.message
    })

  }
}