let show_review_dialog, review_dialog, review_submit, reviews, rating, description, sum = 0, count = 0;

// toggle the visibilty of the dialog
const toggleDialog = ({ target }) => {
    const isDisplayed = !review_dialog.classList.contains('hide')
    // if the dialog already displayed
    // must be goes hidden only if the click come from dialog
    // not from the child
    if (isDisplayed && target != review_dialog) return;
    review_dialog.classList[isDisplayed ? 'add' : 'remove']('hide')
}

// hanle the submit button
const submit_review = () => {
    toggleDialog({ target: review_dialog })
    createReview(rating.value, description.value)
    rating.setAttribute('value', 4)
    description.value = ''
}

/** 
 * creating a dom element
 * for rendring the review on the page
 * <div>
 *  <rate-me value="@param rating" readonly ></rate-me>
 *  <p><b>@param rating</b>, @param description</p>
 * </div>
 * */
const appendReview = (rating, description) => {
    const div = document.createElement('div')
    div.className = 'review'
    const rateme = document.createElement('rate-me')
    rateme.setAttribute('value', rating)
    rateme.setAttribute('readonly', true)
    const p = document.createElement('p')
    p.className = 'review-title'
    p.innerHTML = `<b>${rating}</b>, ${description}`
    div.appendChild(rateme)
    div.appendChild(p)
    reviews.appendChild(div)
    sum += rating
    count += 1
    updateAverege()
}

// calculate the average review
// and display it on the top of the page
const updateAverege = () => {
    const avg_rating_number = document.getElementById('avg-rating-number')
    const avg_rating = document.getElementById('avg-rating')
    // check if count equal 0
    // to prevent divide on 0 Exception
    if (count != 0) {
        avg_rating.setAttribute('value', Math.round(sum / count))
        avg_rating_number.innerText = (sum / count).toFixed(1)
    }
}

// post a new review to server
// append it to the page
const createReview = (rating, description) => {
    fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating,
            description
        })
    })
        .then(
            () => appendReview(rating, description)
        )
}

// fetch the reviews from the server
// append them to page
const loadReviews = async () => {
    fetch('/api/reviews')
        .then(res => res.json())
        .then(reviews => {
            reviews.forEach((review) => {
                const { rating, description } = review
                appendReview(rating, description)
            })
        })
}

// link the varaibles with the lements on the page
// listen to click events
// get the reviews from the server
window.onload = () => {
    show_review_dialog = document.getElementById('show-review-dialog')
    review_dialog = document.getElementById('review-dialog')
    review_submit = document.getElementById('review-submit')
    reviews = document.getElementById('reviews')
    rating = document.getElementById('rating')
    description = document.getElementById('description')

    show_review_dialog.addEventListener('click', toggleDialog, false)
    review_dialog.addEventListener('click', toggleDialog, true)
    review_submit.addEventListener('click', submit_review, true)
    loadReviews()
}