import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAlert } from '../../../redux/actions/dataActions'
import dayjs from 'dayjs'
//Mui
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
      }
    } = this.props
    return (
      <Fragment>
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

  }
})

const mapStateToProps = (state) => ({
  alert: state.data.alert
})

export default connect(mapStateToProps, { getAlert })(withStyles(styles)(Alert))
