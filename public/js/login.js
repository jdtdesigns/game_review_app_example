const loginForm = (() => {
  const loginEl = document.querySelector('#login-form')
  const errorOutput = document.querySelector('#error-output')

  async function loginUser(e) {
    e.preventDefault()

    const { email, password } = loginEl

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      })

      if (res.status !== 200) {
        const unparsedError = await res.text()
        const parsed = JSON.parse(unparsedError)

        errorOutput.innerText = parsed.message
        errorOutput.classList.remove('hidden')
        return
      }

      window.location = '/dashboard'
    } catch (error) {
      console.log(error)
    }
  }

  function init() {
    loginEl.addEventListener('submit', loginUser)
  }

  return { init }
})()

loginForm.init()