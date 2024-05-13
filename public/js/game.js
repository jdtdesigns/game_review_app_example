const game = (() => {
  const gameForm = document.querySelector('#game-form')
  const errorOutput = document.querySelector('#error-output')

  async function addGame(e) {
    e.preventDefault()

    const { title, platform, genre } = gameForm

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.value,
          platform: platform.value,
          genre: genre.value
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
    gameForm.addEventListener('submit', addGame)
  }

  return { init }
})()

game.init()