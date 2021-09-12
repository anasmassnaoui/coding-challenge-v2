import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    star: {
        margin: '2px',
        cursor: ({ clickable = false }) => clickable ? 'pointer' : 'default'
    }
})

export default styles