const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

const showRegister = document.getElementById("showRegister")
const showLogin = document.getElementById("showLogin")

const loginSection = document.getElementById("loginSection")
const registerSection = document.getElementById("registerSection")

// alternar telas

if (showRegister) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault()
    loginSection.style.display = "none"
    registerSection.style.display = "block"
  })
}

if (showLogin) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault()
    loginSection.style.display = "block"
    registerSection.style.display = "none"
  })
}

// LOGIN

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault()

    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    try {

      await API.login(email, password)

      window.location.href = "index.html"

    } catch (err) {

      alert("Invalid credentials")

    }

  })

}

// REGISTER

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.getElementById("regName").value
    const email = document.getElementById("regEmail").value
    const password = document.getElementById("regPassword").value

    try {

      await API.register(name, email, password)

      window.location.href = "index.html"

    } catch (err) {

      alert("Register failed")

    }

  })

}