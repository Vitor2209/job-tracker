/**

* JobTrack – Main Application
* Orchestrates all modules
  */

const App = {

deleteTargetId: null,
searchQuery: "",

// ============================
// INIT
// ============================
async init() {

    // inicializar kanban
    Kanban.init()

    // carregar tema salvo
    this.loadTheme()

    // eventos da interface
    this.bindEvents()

    // render inicial
    await this.renderBoard()

},

// ============================
// EVENTOS
// ============================
bindEvents() {

    // botão adicionar vaga
    const addBtn = document.getElementById("addJobBtn")
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            UI.resetForm()
            UI.showModal("jobModal")
        })
    }

    // fechar modal
    const modalClose = document.getElementById("modalClose")
    if (modalClose) {
        modalClose.addEventListener("click", () => UI.hideModal("jobModal"))
    }

    const modalCancel = document.getElementById("modalCancel")
    if (modalCancel) {
        modalCancel.addEventListener("click", () => UI.hideModal("jobModal"))
    }

    // submit do formulário
    const form = document.getElementById("jobForm")
    if (form) {
        form.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // delete modal
    const deleteClose = document.getElementById("deleteModalClose")
    if (deleteClose) {
        deleteClose.addEventListener("click", () => UI.hideModal("deleteModal"))
    }

    const deleteCancel = document.getElementById("deleteCancelBtn")
    if (deleteCancel) {
        deleteCancel.addEventListener("click", () => UI.hideModal("deleteModal"))
    }

    const deleteConfirm = document.getElementById("deleteConfirmBtn")
    if (deleteConfirm) {
        deleteConfirm.addEventListener("click", () => this.handleDelete())
    }

    // dark mode
    const darkToggle = document.getElementById("darkModeToggle")
    if (darkToggle) {
        darkToggle.addEventListener("click", () => this.toggleTheme())
    }

    // search
    const search = document.getElementById("searchInput")
    if (search) {
        search.addEventListener("input", (e) => {
            this.searchQuery = e.target.value.toLowerCase()
            this.renderBoard()
        })
    }

    // fechar modal clicando fora
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("active")
            }
        })
    })

    // ESC fecha modais
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-overlay.active")
                .forEach(m => m.classList.remove("active"))
        }
    })

},

// ============================
// RENDER BOARD
// ============================
async renderBoard() {

    try {

        let jobs = await API.getJobs()

        if (!Array.isArray(jobs)) {
            jobs = jobs.jobs || []
        }

        if (this.searchQuery) {
            jobs = jobs.filter(j =>
                j.company?.toLowerCase().includes(this.searchQuery) ||
                j.position?.toLowerCase().includes(this.searchQuery) ||
                j.location?.toLowerCase().includes(this.searchQuery)
            )
        }

        UI.renderBoard(jobs)

        const stats = await API.getStats()
        UI.renderStats(stats)

    } catch (error) {

        console.error("Render error:", error)

    }

},

// ============================
// SUBMIT FORM
// ============================
async handleFormSubmit(e) {

    e.preventDefault()

    const id = document.getElementById("jobId").value

    const data = {
        company: document.getElementById("jobCompany").value.trim(),
        position: document.getElementById("jobTitle").value.trim(),
        location: document.getElementById("jobLocation").value.trim(),
        status: document.getElementById("jobStatus").value,
        url: document.getElementById("jobUrl").value.trim(),
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

// ============================
// EDIT JOB
// ============================
async openEditModal(id) {

    const jobs = await API.getJobs()

    const list = Array.isArray(jobs) ? jobs : jobs.jobs

    const job = list.find(j => j._id === id)

    if (!job) return

    UI.populateForm(job)

    UI.showModal("jobModal")

},

// ============================
// DELETE JOB
// ============================
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

// ============================
// THEME
// ============================
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

// ============================
// BOOT
// ============================
document.addEventListener("DOMContentLoaded", () => {
App.init()
})

