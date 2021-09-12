import { Box } from "@material-ui/core";
import RateMe from "../RateMe";
import styles from "../../styles";

const AverageRating = ({ average }) => {

    const classes = styles()

    return (
        <Box display="flex" alignItems="center">
            <h2 className={classes.reviewTitle} > {average} </h2>
            <RateMe initialRating={average} readonly />
        </Box>
    )
}

export default AverageRating