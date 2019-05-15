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
        credentials: { 
          avatarLetters, 
          imageUrl 
        }
      },
      classes
    } = this.props
    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media&token=fbf326f1-0c4b-4ab5-8430-9eebac279efa'


    return (
      imageUrl === defaultPic ? (
        <Avatar className={classes.navAvatar}>{avatarLetters.charAt(0)}</Avatar>
      ) : avatarLetters === "" ? (
        <AccountCircle />
        ) : (
        <img alt='userPic' src={imageUrl} className={classes.profilePic} />
      )
    )
  }
}

const styles = {
  profilePic: {
    width: 30,
    borderRadius: '50%'
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(ProfilePic))
