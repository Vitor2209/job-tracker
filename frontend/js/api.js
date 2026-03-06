/**
 * JobTrack – API Layer
 * Connects frontend to Express backend
 */

const API_URL = "http://localhost:5000/api"

// COLE AQUI O TOKEN QUE VOCE PEGOU NO THUNDER CLIENT
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTk5ZTU4NWIxYTgxZWI3YmZkMzcwMiIsImlhdCI6MTc3MjgwODg0MiwiZXhwIjoxNzczNDEzNjQyfQ.l64PvBhbV43usmm8AxoXFuamf3Q36svFGUkuM4hLr5o"

const API = {

    // =============================
    // GET ALL JOBS
    // =============================

    async getJobs() {

        const res = await fetch(`${API_URL}/jobs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        })

        const data = await res.json()

        return data.jobs

    },

    // =============================
    // CREATE JOB
    // =============================

    async createJob(jobData) {

        const res = await fetch(`${API_URL}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(jobData)
        })

        return res.json()

    },

    // =============================
    // UPDATE JOB
    // =============================

    async updateJob(id, jobData) {

        const res = await fetch(`${API_URL}/jobs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(jobData)
        })

        return res.json()

    },

    // =============================
    // DELETE JOB
    // =============================

    async deleteJob(id) {

        const res = await fetch(`${API_URL}/jobs/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        })

        return res.json()

    },

    // =============================
    // GET STATS
    // =============================

    async getStats() {

        const res = await fetch(`${API_URL}/jobs/stats`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        })

        return res.json()

    }

}