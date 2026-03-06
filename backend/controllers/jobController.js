const Job = require("../models/Job")
const mongoose = require("mongoose")

// CREATE JOB
exports.createJob = async (req, res) => {

  try {

    const { company, position, status } = req.body

    const job = await Job.create({
      company,
      position,
      status,
      createdBy: req.user.id
    })

    res.status(201).json({
      job
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}



// GET ALL JOBS (FILTER + SEARCH + PAGINATION)
exports.getJobs = async (req, res) => {

  try {

    const { status, search, page = 1, limit = 10 } = req.query

    const queryObject = {
      createdBy: req.user.id
    }

    // filtro por status
    if (status && status !== "all") {
      queryObject.status = status
    }

    // busca por empresa ou posição
    if (search) {
      queryObject.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } }
      ]
    }

    const skip = (page - 1) * limit

    const jobs = await Job.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    const totalJobs = await Job.countDocuments(queryObject)

    res.status(200).json({
      totalJobs,
      numOfPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      jobs
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}



// UPDATE JOB
exports.updateJob = async (req, res) => {

  try {

    const { id } = req.params

    const job = await Job.findOneAndUpdate(
      {
        _id: id,
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

    res.status(200).json({
      job
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}



// DELETE JOB
exports.deleteJob = async (req, res) => {

  try {

    const { id } = req.params

    const job = await Job.findOneAndDelete({
      _id: id,
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

    res.status(500).json({
      message: error.message
    })

  }

}



// JOB STATS (DASHBOARD)
exports.getJobStats = async (req, res) => {

  try {

    const stats = await Job.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    const statsObject = {
      Applied: 0,
      Interview: 0,
      Declined: 0
    }

    stats.forEach(item => {
      statsObject[item._id] = item.count
    })

    res.status(200).json({
      stats: statsObject
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}
exports.getMonthlyStats = async (req, res) => {
  try {

    const stats = await Job.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 }
      }
    ])

    res.status(200).json({ stats })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}