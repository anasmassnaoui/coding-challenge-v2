import { useState } from "react"
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import { Reviews, AverageRating, SubmitReviewDialog } from "./components";
import styles from "./styles";


function App() {

  const classes = styles()
  const [average, setAverage] = useState(0)
  const [submitReviewDialog, setSubmitReviewDialog] = useState(false)

  // listen to reviews changes
  // to calculate the average
  const onReviewsChange = (reviews) => {
    const sum = reviews.reduce((prev, curr) => prev + curr.rating, 0)
    setAverage(reviews.length > 0 ? (sum / reviews.length).toFixed(1) : 0)
  }

  // toggle dialog visibility
  const toggleSubmitReviewDialog = () => setSubmitReviewDialog(!submitReviewDialog)

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1> The Minimalist Entrepreneur </h1>
      </Grid>
      <Grid item container xs={12} alignItems='center'>
        <Grid item xs direction='column' container>
          <Grid item xs>
            <AverageRating average={average} />
          </Grid>
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={toggleSubmitReviewDialog} > Add review </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <Reviews onChange={onReviewsChange} />
      </Grid>
      <SubmitReviewDialog show={submitReviewDialog} onClose={toggleSubmitReviewDialog} />
    </Grid>
  );
}

export default App;
