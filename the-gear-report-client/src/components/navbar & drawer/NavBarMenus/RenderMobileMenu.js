import React, { Component } from 'react';
import ProfilePic from '../../../util/ProfilePic'
import { connect } from 'react-redux'
import Notifications from './Notifications'
// import { markNotificationsRead } from '../../../redux/actions/userActions'
//Mui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
//Icons
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

export class RenderMobileMenu extends Component {

  state = {
    notificationsAnchor: null
  }

  handleNotificationsOpen = (event, notes) => {
    console.log(event.currentTarget);
    this.setState({ 
      notificationsAnchor: event.currentTarget
     })
  }

  // handleNotificationsClose = (notes) => {
  //   this.props.markNotificationsRead(notes)
  //   this.setState({
  //     notificationsAnchor: null
  //   })
  // }

  render() {
    const { 
      mobileMoreAnchorEl, 
      isMobileMenuOpen, 
      handleMenuClose, 
      handleMobileMenuClose, 
      handleMenuOpen,
      user,
      handleNotificationsClose
    } = this.props

    const {
      notificationsAnchor
    } = this.state

    let unreadNotifications = []
    user.notifications.forEach(note =>{ if(!note.read) unreadNotifications.push(note.notificationId) })

    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleNotificationsOpen} >
          <IconButton 
              color="inherit"
              aria-haspopup="true"
              >
              <Badge badgeContent={unreadNotifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {unreadNotifications.length > 0 && 
            <Notifications 
              anchorEl={notificationsAnchor}
              handleMenuClose={this.props.handleNotificationsClose}
              noteIds={unreadNotifications}
            />}
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleMenuOpen}>
          <IconButton color="inherit">
            <ProfilePic size={30} />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )
  }
}

const mapDispatchToProps = {
  // markNotificationsRead
}

export default connect(null, mapDispatchToProps)(RenderMobileMenu)
