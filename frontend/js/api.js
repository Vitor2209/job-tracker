const BASE_URL = "http://localhost:5000"

const API = {

  // pegar token salvo
  getToken() {
    return localStorage.getItem("token")
  },

  // headers padrão
  headers() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    }
  },

  // LOGIN (salva token automaticamente)
  async login(email, password) {

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    localStorage.setItem("token", data.token)

    return data
  },

  // GET JOBS
  async getJobs() {

    const res = await fetch(`${BASE_URL}/api/jobs`, {
      headers: this.headers()
    })

    const data = await res.json()

    return data.jobs
  },

  // CREATE JOB
  async createJob(job) {

    const res = await fetch(`${BASE_URL}/api/jobs`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(job)
    })

    return res.json()
  },

  // UPDATE JOB
  async updateJob(id, job) {

    const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
      method: "PATCH",
      headers: this.headers(),
      body: JSON.stringify(job)
    })

    return res.json()
  },

  // DELETE JOB
  async deleteJob(id) {

    const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
      method: "DELETE",
      headers: this.headers()
    })

    return res.json()
  },

  // STATS
  async getStats() {

    const res = await fetch(`${BASE_URL}/api/jobs/stats`, {
      headers: this.headers()
    })

    return res.json()
  }

}