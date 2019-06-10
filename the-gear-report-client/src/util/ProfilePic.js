import React, { Component } from 'react'
import { connect } from 'react-redux'
//Mui
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';


export class ProfilePic extends Component {
  render() {
    const { 
      user: { 
        authenticated,
        credentials: { 
          avatarLetters, 
          imageUrl 
        }
      },
      classes,
      size
    } = this.props
    const defaultPic = "https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media"

    return (
      authenticated === true ?
        imageUrl !== defaultPic ?
          <img alt='userPic' src={imageUrl} style={{ height: size, width: size, borderRadius: '50%' }} /> :
        avatarLetters !== "" ?
          <Avatar className={classes.navAvatar}>{avatarLetters.charAt(0)}</Avatar> :
          <AccountCircle /> :
          <AccountCircle />
    )
  }
}

const styles = {
  navAvatar: {
    width: 30,
    height: 30,
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(ProfilePic))

