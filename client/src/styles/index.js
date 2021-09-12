import { makeStyles } from '@material-ui/core/styles';

/**
 * global styles
 */
const styles = makeStyles({
    reviewTitle: {
        margin: '6px 10px'
    },
    button: {
        border: '1px solid #797874',
        color: '#797874',
        textTransform: 'capitalize',
        padding: '5px 17px',
        margin: '10px auto',
        fontWeight: '600'
    },
    textInput: {
        '& .MuiInput-underline:after': {
            border: 'none'
        },
        '& .MuiInput-underline:before': {
            border: 'none'
        },
        '& .MuiInput-underline:hover:before': {
            border: 'none'
        }
    },
    reviewDialog: {
        '& > div > div': {
            borderRadius: '20px'
        }
    }
});

export default styles