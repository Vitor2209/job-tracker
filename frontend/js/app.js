const jobForm = document.getElementById("jobForm")
const jobModal = document.getElementById("jobModal")
const addJobBtn = document.getElementById("addJobBtn")
const modalClose = document.getElementById("modalClose")
const modalCancel = document.getElementById("modalCancel")

let jobs = []

// ============================
// LOAD JOBS
// ============================

async function loadJobs() {

  try {

    jobs = await API.getJobs()

    console.log("Jobs:", jobs)

    renderJobs()

  } catch (err) {

    console.error("Failed to fetch jobs", err)

  }

}

// ============================
// RENDER JOBS
// ============================

function renderJobs() {

  document.getElementById("colApplied").innerHTML = ""
  document.getElementById("colInterview").innerHTML = ""
  document.getElementById("colOffer").innerHTML = ""
  document.getElementById("colRejected").innerHTML = ""

  jobs.forEach(job => {

    const card = document.createElement("div")
    card.className = "job-card"

    card.innerHTML = `
    
      <h4>${job.position}</h4>
      <p>${job.company}</p>
      
      <div class="job-actions">
        <button onclick="deleteJob('${job._id}')">Delete</button>
      </div>

    `

    const column = getColumn(job.status)

    column.appendChild(card)

  })

}

// ============================
// GET COLUMN
// ============================

function getColumn(status) {

  if (status === "applied") return document.getElementById("colApplied")
  if (status === "interview") return document.getElementById("colInterview")
  if (status === "offer") return document.getElementById("colOffer")
  if (status === "rejected") return document.getElementById("colRejected")

}

// ============================
// CREATE JOB
// ============================

if (jobForm) {

  jobForm.addEventListener("submit", async (e) => {

  e.preventDefault()

  const job = {

    company: document.getElementById("jobCompany").value,
    position: document.getElementById("jobTitle").value,
    status: document.getElementById("jobStatus").value

  }

  console.log("Sending job:", job)

  try {

    const res = await API.createJob(job)

    console.log("Created:", res)

    jobForm.reset()

    jobModal.classList.remove("active")

    loadJobs()

  } catch (err) {

    console.error("Create job error:", err)

  }

})

}

// ============================
// DELETE JOB
// ============================

async function deleteJob(id) {

  try {

    await API.deleteJob(id)

    loadJobs()

  } catch (err) {

    console.error("Delete failed", err)

  }

}

// ============================
// MODAL
// ============================

function openModal() {

  jobModal.classList.add("active")

}

function closeModal() {

  jobModal.classList.remove("active")

}

addJobBtn.addEventListener("click", openModal)
modalClose.addEventListener("click", closeModal)
modalCancel.addEventListener("click", closeModal)

// ============================
// INIT
// ============================

document.addEventListener("DOMContentLoaded", () => {

  if (!localStorage.getItem("token")) {

    window.location.href = "login.html"

  }

  loadJobs()

})