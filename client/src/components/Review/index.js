import { Box } from "@material-ui/core";
import RateMe from "../RateMe"
import styles from "../../styles"

const Review = ({ rating, description }) => {

    const classes = styles()

    return (
        <Box display="flex" alignItems="center">
            <RateMe initialRating={rating} readonly />
            <p className={classes.reviewTitle}><b>{rating}</b>, {description}</p>
        </Box>
    )
}

export default Review