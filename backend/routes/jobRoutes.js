const express = require("express")
const router = express.Router()

const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobStats,
  getMonthlyStats
} = require("../controllers/jobController")

const authMiddleware = require("../middleware/authMiddleware")

// LISTAR TODAS AS VAGAS
router.get("/", authMiddleware, getJobs)

// CRIAR NOVA VAGA
router.post("/", authMiddleware, createJob)

// ESTATÍSTICAS DO DASHBOARD
router.get("/stats", authMiddleware, getJobStats)

// ESTATÍSTICAS MENSAIS (para gráficos)
router.get("/monthly-stats", authMiddleware, getMonthlyStats)

// ATUALIZAR VAGA
router.patch("/:id", authMiddleware, updateJob)

// DELETAR VAGA
router.delete("/:id", authMiddleware, deleteJob)

module.exports = router