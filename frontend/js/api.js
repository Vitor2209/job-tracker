const BASE_URL = "http://localhost:5000"

window.API = {

  getToken() {
    return localStorage.getItem("token")
  },

  headers() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    }
  },

  async getJobs() {

    const res = await fetch(`${BASE_URL}/api/jobs`, {
      headers: this.headers()
    })

    const data = await res.json()

    return data.jobs
  },

  async createJob(job) {

    const res = await fetch(`${BASE_URL}/api/jobs`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(job)
    })

    return res.json()
  },

  async deleteJob(id) {

    const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
      method: "DELETE",
      headers: this.headers()
    })

    return res.json()
  }

}