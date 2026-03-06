const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
createJob,
getJobs,
getJob,
updateJob,
deleteJob,
getStats
} = require("../controllers/jobController")

// =======================
// JOB ROUTES
// =======================

router.route("/")
.post(authMiddleware, createJob)
.get(authMiddleware, getJobs)

router.route("/stats")
.get(authMiddleware, getStats)

router.route("/:id")
.get(authMiddleware, getJob)
.patch(authMiddleware, updateJob)
.delete(authMiddleware, deleteJob)

module.exports = router
