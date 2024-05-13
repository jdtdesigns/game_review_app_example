const registerForm = (() => {
  const registerEl = document.querySelector('#register-form')

  async function registerUser(e) {
    e.preventDefault()

    const { username, email, password } = registerEl

    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value
        })
      })

      window.location = '/dashboard'
    } catch (error) {
      console.log(error)
    }
  }

  function init() {
    registerEl.addEventListener('submit', registerUser)
  }

  return { init }
})()

registerForm.init()