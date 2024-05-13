showReviews = (() => {
  const reviewsOutput = document.querySelector('#review-output')

  async function outputReviews() {
    const gameId = location.pathname.split('/')[2]
    const res = await fetch('/api/game/reviews/' + gameId)

    const data = await res.json()

    if (data.length) reviewsOutput.innerHTML = ''

    data.forEach(review => {
      reviewsOutput.insertAdjacentHTML('beforeend', `
      <div class="review border-2 border-indigo-400 p-3 flex flex-col mt-2">
        <h3 class="text-xl bold">Text: ${review.text}</h3>
        <p>Rating: ${review.rating}</p>
      </div>
      `)
    })
  }

  function init() {
    outputReviews()
  }

  return { init }
})()

showReviews.init()