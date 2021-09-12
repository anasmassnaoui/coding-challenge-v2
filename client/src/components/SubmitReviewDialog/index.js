import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import RateMe from "../RateMe";
import styles from '../../styles'

const SubmitReviewDialog = ({ show = false, onClose = () => null }) => {

  const classes = styles()
  let rating = 3, description = '';

  const submitReview = () => {
    const { REACT_APP_API_URL } = process.env

    fetch(`http://${REACT_APP_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating,
        description
      })
    })
    onClose()
  }

  return (
    <Dialog className={classes.reviewDialog} open={show} onClose={onClose} >
      <DialogContent>
        <h1> What's your rating? </h1>
        <p> Rating </p>
        <RateMe onChange={value => rating = value} initialRating={3} />
        <p> Review </p>
        <TextField onChange={({ target: { value } }) => description = value} className={classes.textInput} placeholder="Start typing...." fullWidth />
        <Button onClick={submitReview} className={classes.button} > Submit review </Button>
      </DialogContent>
    </Dialog>
  )
}

export default SubmitReviewDialog