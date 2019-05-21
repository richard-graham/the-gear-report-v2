import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAlert } from '../../../redux/actions/dataActions'
import dayjs from 'dayjs'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
//Icons
import { Cancel, Check } from '@material-ui/icons'

export class Alert extends Component {

  componentDidMount = () => {
    this.props.getAlert(this.props.match.params.alertId)
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
        likeCount,
        commentCount,
        userHandle,
        userImage,
        comments,
        resolved
      },
      loading
    } = this.props
    return (
      <Paper className={classes.paper}>
        {loading ? <CircularProgress size={70} className={classes.progress} /> : (
          <Fragment>
            <div className={classes.header}>
              <img src={userImage} className={classes.userImage} />
            </div>
            <Typography variant='body1' className={classes.alertHeader}>{title}</Typography>
            {createdAt && 
            <Typography variant='body2' className={classes.alertDate}>
              {`Created At: ${dayjs(createdAt).format('DD-MM-YYYY')}`}
            </Typography>}
            <Typography>{resolved ? 'Resolved' : 'Not Resolved'}</Typography>
            <Typography>{sponsored ? 'Sponsored' : 'Not Sponsored'}</Typography>
            <Typography >{body}</Typography>
            <Typography >{title}</Typography>
          </Fragment>
        )}
      </Paper>
    )
  }
}

const styles = theme => ({
  ...theme,
  alertHeader: {
    fontSize: 35,
    margin: 20
  },
  alertDate: {
    fontSize: 15,
  },
  paper: {
    margin: 40,
    marginTop: 60,
    minWidth: 320,
    width: '80%',
    minHeight: '80vh'
  },
  userImage: {
    width: 30,
    borderRadius: '50%'
  },
  progress: {
    marginTop: '30%'
  }
})

const mapStateToProps = (state) => ({
  alert: state.data.alert,
  loading: state.UI.loading
})

export default connect(mapStateToProps, { getAlert })(withStyles(styles)(Alert))
