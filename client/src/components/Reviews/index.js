import { useEffect, useReducer } from "react"
import { getMessage } from '../../utils/sockets'
import Review from "../Review"

const Reviews = ({ onChange = (reviews) => null }) => {
    const reducer = (reviews, action) => {
        switch (action.type) {
            case 'setReviews':
                return action.payload
            case 'addReview':
                return [...reviews, action.payload]
            default:
                return reviews
        }
    }

    const [reviews, dispatch] = useReducer(reducer, [])
    useEffect(() => {
        const { REACT_APP_API_URL } = process.env

        const ws = new WebSocket(`ws://${REACT_APP_API_URL}/reviews`)
        ws.onmessage = ({ data }) => {
            const review = getMessage(data)
            dispatch({
                type: 'addReview',
                payload: review
            })
        }
        fetch(`http://${REACT_APP_API_URL}/reviews`)
            .then(res => res.json())
            .then(reviews => dispatch({
                type: 'setReviews',
                payload: reviews
            }))
    }, [])

    useEffect(() => onChange(reviews), [reviews, onChange])


    return (
        <div>
            {
                reviews.map(({ rating, description }, index) => <Review
                    key={index}
                    rating={rating}
                    description={description}
                />)
            }
        </div>
    )
}

export default Reviews