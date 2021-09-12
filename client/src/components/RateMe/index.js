import { useEffect, useState } from "react"
import Star from "./Star"

const RateMe = ({ initialRating = 0, readonly = false, onChange = (rating) => null }) => {
    const [rating, setRating] = useState(initialRating)

    const handleClick = ({ nativeEvent: { offsetX } }, starIndex) => {
        const offset = offsetX > 10 ? 1 : 0.5
        let newRating = starIndex + offset
        if (newRating === rating) newRating = 0
        setRating(newRating)
        onChange(newRating)
    }

    const getType = (starIndex) => {
        if (starIndex <= rating)
            return 'FILLED_STAR';
        const absoluteRating = Math.floor(rating)
        const rest = rating - absoluteRating
        if (starIndex === (absoluteRating + 1) &&
            rest > 0 &&
            rest <= 0.5)
            return 'HALF_STAR';
        return 'STAR';
    }

    useEffect(() => {
        setRating(initialRating)
    }, [initialRating])

    return (
        <>
            <Star type={getType(1)} onClick={!readonly ? ((e) => handleClick(e, 0)) : null} />
            <Star type={getType(2)} onClick={!readonly ? ((e) => handleClick(e, 1)) : null} />
            <Star type={getType(3)} onClick={!readonly ? ((e) => handleClick(e, 2)) : null} />
            <Star type={getType(4)} onClick={!readonly ? ((e) => handleClick(e, 3)) : null} />
            <Star type={getType(5)} onClick={!readonly ? ((e) => handleClick(e, 4)) : null} />
        </>
    )
}

export default RateMe