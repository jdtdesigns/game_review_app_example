const dashboard = (() => {
  const gameOutput = document.querySelector('#game-output')

  async function outputGames() {
    const res = await fetch('/api/games')

    const data = await res.json()

    if (data.length) gameOutput.innerHTML = ''

    data.forEach(game => {
      gameOutput.insertAdjacentHTML('beforeend', `
      <div class="game border-2 border-indigo-400 p-3 flex flex-col mt-2">
        <h3 class="text-xl bold">Title: ${game.title}</h3>
        <p>Platform: ${game.platform}</p>
        <p>Genre: ${game.genre}</p>
        <a href="/reviews/${game._id}" class="text-indigo-400">See Reviews</a>
        <a href="/review/${game._id}" class="text-indigo-400">Add Review</a>
      </div>
      `)
    })
  }

  function init() {
    outputGames()
  }

  return { init }
})()

dashboard.init()