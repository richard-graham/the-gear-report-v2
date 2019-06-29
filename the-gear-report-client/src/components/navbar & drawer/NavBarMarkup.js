import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderMenu from './NavBarMenus/RenderMenu'
import { RenderMobileMenu } from './NavBarMenus/RenderMobileMenu'
import ProfilePic from '../../util/ProfilePic'
import Search from '../../util/Search'
import Notifications from './NavBarMenus/Notifications'
import { markNotificationsRead } from '../../redux/actions/userActions'
//Mui
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
//icons
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';



const styles = theme => ({
  ...theme
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    notificationsAnchor: null
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleNotificationsOpen = (event, notes) => {
    this.setState({ 
      notificationsAnchor: event.currentTarget
     })
  }

  handleNotificationsClose = (notes) => {
    this.props.markNotificationsRead(notes)
    this.setState({
      notificationsAnchor: null
    })
  }

  handleMenuClose = () => {
    this.setState({ 
      anchorEl: null,
      mobileMoreAnchorEl: null
    })
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, notificationsAnchor } = this.state;
    const { classes, user } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    let unreadNotifications = []
    user.notifications.forEach(note =>{ if(!note.read) unreadNotifications.push(note.notificationId) })
    return (
      <Fragment>
          <Typography component={Link} to='/' className={classes.navTitle} variant="h6" color="inherit" noWrap>
            The Gear Report
          </Typography>
        <div className={classes.navGrow} />
        <Search searchType={'Nav'} />
        <div className={classes.navGrow} />
        <div className={classes.navSectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit"
            aria-haspopup="true"
            onClick={this.handleNotificationsOpen}
            >
            <Badge badgeContent={unreadNotifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {unreadNotifications.length > 0 && 
          <Notifications 
            anchorEl={notificationsAnchor}
            handleMenuClose={this.handleNotificationsClose}
            noteIds={unreadNotifications}
          />}
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenuOpen}
            color="inherit"
          >
            {user ? <ProfilePic user={user} size={30} /> : ''}
          </IconButton>
        </div>
        <div className={classes.navSectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
          <RenderMenu 
            anchorEl={anchorEl} 
            isMenuOpen={isMenuOpen} 
            handleMenuClose={this.handleMenuClose} 
          />
          <RenderMobileMenu 
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            isMobileMenuOpen={isMobileMenuOpen}
            handleMenuClose={this.handleMenuClose}
            handleMobileMenuClose={this.handleMenuClose}
            handleMenuOpen={this.handleMenuOpen}
          />
         

        </div>
      </Fragment>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  markNotificationsRead
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))