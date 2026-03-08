document.addEventListener("DOMContentLoaded", () => {

    Storage.requireAuth(); // verifica login

    Storage.seed(); // cria dados demo

    App.init();
});
const App = {

  deleteTargetId: null,
  searchQuery: "",

  async init() {

    Kanban.init()

    this.loadTheme()

    this.bindEvents()

    await this.renderBoard()

  },

  bindEvents() {

    const addBtn = document.getElementById("addJobBtn")

    if (addBtn) {

      addBtn.addEventListener("click", () => {

        UI.resetForm()

        UI.showModal("jobModal")

      })

    }

    const form = document.getElementById("jobForm")

    if (form) {

      form.addEventListener("submit", (e) => this.handleFormSubmit(e))

    }

    const deleteConfirm = document.getElementById("deleteConfirmBtn")

    if (deleteConfirm) {

      deleteConfirm.addEventListener("click", () => this.handleDelete())

    }

    const search = document.getElementById("searchInput")

    if (search) {

      search.addEventListener("input", (e) => {

        this.searchQuery = e.target.value.toLowerCase()

        this.renderBoard()

      })

    }

  },

  async renderBoard() {

    try {

      let jobs = await API.getJobs()

      if (this.searchQuery) {

        jobs = jobs.filter(j =>
          j.company?.toLowerCase().includes(this.searchQuery) ||
          j.position?.toLowerCase().includes(this.searchQuery)
        )

      }

      UI.renderBoard(jobs)

      const stats = await API.getStats()

      UI.renderStats(stats)

    } catch (error) {

      console.error("Render error:", error)

    }

  },

  async handleFormSubmit(e) {

    e.preventDefault()

    const id = document.getElementById("jobId").value

    const data = {

      company: document.getElementById("jobCompany").value.trim(),
      position: document.getElementById("jobTitle").value.trim(),
      location: document.getElementById("jobLocation").value.trim(),
      status: document.getElementById("jobStatus").value,
      notes: document.getElementById("jobNotes").value.trim()

    }

    if (!data.company || !data.position) return

    try {

      if (id) {

        await API.updateJob(id, data)

      } else {

        await API.createJob(data)

      }

      UI.hideModal("jobModal")

      await this.renderBoard()

    } catch (error) {

      console.error("Submit error:", error)

    }

  },

  async openEditModal(id) {

    const jobs = await API.getJobs()

    const job = jobs.find(j => j._id === id)

    if (!job) return

    UI.populateForm(job)

    UI.showModal("jobModal")

  },

  openDeleteModal(id) {

    this.deleteTargetId = id

    UI.showModal("deleteModal")

  },

  async handleDelete() {

    if (!this.deleteTargetId) return

    await API.deleteJob(this.deleteTargetId)

    this.deleteTargetId = null

    UI.hideModal("deleteModal")

    await this.renderBoard()

  },

  loadTheme() {

    const saved = localStorage.getItem("jobtrack_theme") || "dark"

    document.documentElement.setAttribute("data-theme", saved)

  },

  toggleTheme() {

    const current = document.documentElement.getAttribute("data-theme")

    const next = current === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", next)

    localStorage.setItem("jobtrack_theme", next)

  }

}

document.addEventListener("DOMContentLoaded", () => App.init())