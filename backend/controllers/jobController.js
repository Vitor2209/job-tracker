const Job = require("../models/Job")

// CREATE JOB
exports.createJob = async (req, res) => {

  try {

    const job = await Job.create({
      user: req.user.id,
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
      notes: req.body.notes
    })

    res.status(201).json(job)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


// GET ALL JOBS
exports.getJobs = async (req, res) => {

  try {

    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 })

    res.json(jobs)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}