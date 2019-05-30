import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAlert } from '../../../redux/actions/dataActions'
import dayjs from 'dayjs'
import AlertImageGallery from './AlertImageGallery'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
//Icons

export class Alert extends Component {

  componentDidMount = () => {
    this.props.getAlert(this.props.match.params.alertId)
  }

  redirect = () => {
    console.log(this.props.history);
  }

  render() {
    const { 
      classes, 
      alert: {
        title,
        createdAt,
        body,
        sponsored,
        images,
        userImage,
        resolved,
        userHandle
      },
      loading
    } = this.props
    return (
      <Paper className={classes.paper}>
        {loading ? <CircularProgress size={70} className={classes.progress} /> : (
          <Fragment>
          <Typography variant='body1' className={classes.alertHeader}>{title}</Typography>
          <div className={classes.content}>
            {createdAt && 
            <Typography variant='body2' className={classes.alertDate}>
              {`Date: ${dayjs(createdAt).format('DD-MM-YYYY')}`}
            </Typography>}
            <Typography>{`Status: ${resolved ? 'Resolved' : 'Not Resolved'}`}</Typography>
            <Typography>{`Sponsored: ${sponsored ? 'True' : 'False'}`}</Typography>
            <Typography>{`Created By: ${userHandle}`}</Typography>
            <br />
            <Typography >{`Description: ${body}`}</Typography>
            <Typography >{title}</Typography>
            </div>
            <div className={classes.header}>
              <img alt='words' src={userImage} className={classes.userImage} />
            </div>
            <AlertImageGallery images={images} />
          </Fragment>
        )}
      </Paper>
    )
  }
}

const styles = theme => ({
  ...theme,
  alertHeader: {
    fontSize: 27,
    marginBottom: 20
  },
  alertDate: {
    fontSize: 15,
  },
  paper: {
    margin: 40,
    marginTop: 60,
    minWidth: 320,
    width: '80%',
    minHeight: '80vh',
    padding: 50
  },
  userImage: {
    width: 30,
    borderRadius: '50%'
  },
  progress: {
    marginTop: '30%'
  },
  content: {
    marginTop: 20,
    textAlign: 'left'
  }
})

const mapStateToProps = (state) => ({
  alert: state.data.alert,
  loading: state.UI.loading
})

export default connect(mapStateToProps, { getAlert })(withStyles(styles)(Alert))
