import React, { Component } from 'react'
//Mui
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';


export class ProfilePic extends Component {

  componentDidMount = () => {
    console.log(this.props.user);
  }

  render() {
    const { 
      classes,
      user: { 
        authenticated,
        credentials: { 
          avatarLetters, 
          imageUrl 
        }
      }
    } = this.props
    const defaultPic = "https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media"

    return (
      classes && 
      authenticated === true ?
        imageUrl !== defaultPic ?
          <img alt='userPic' src={imageUrl} className={classes.profilePic} /> :
        avatarLetters !== "" ?
          <Avatar className={classes.navAvatar}>{avatarLetters.charAt(0)}</Avatar> :
          <AccountCircle /> :
          <AccountCircle />
      
    )
  }
}

const styles = { 
  profilePic: {
    width: 30,
    borderRadius: '50%'
  },
  navAvatar: {
    width: 30,
    height: 30,
  }
}

export default withStyles(styles)(ProfilePic)

