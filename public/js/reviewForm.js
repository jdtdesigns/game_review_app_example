const review = (() => {
  const reviewForm = document.querySelector('#review-form')
  const errorOutput = document.querySelector('#error-output')

  async function addReview(e) {
    e.preventDefault()

    const { text, rating } = reviewForm

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text.value,
          rating: rating.value,
          game: location.pathname.split('/')[2]
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
    reviewForm.addEventListener('submit', addReview)
  }

  return { init }
})()

review.init()