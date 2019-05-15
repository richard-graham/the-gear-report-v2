import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderMenu from './NavBarMenus/RenderMenu'
import { RenderMobileMenu } from './NavBarMenus/RenderMobileMenu'
//Mui
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
//icons
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';



const styles = theme => ({
  ...theme,
  profilePic: {
    width: 30,
    borderRadius: '50%'
  }
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, user: { credentials: { avatarLetters, imageUrl }}, } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media&token=fbf326f1-0c4b-4ab5-8430-9eebac279efa'
    return (
      <Fragment>
          <Typography component={Link} to='/' className={classes.navTitle} variant="h6" color="inherit" noWrap>
            The Gear Report
          </Typography>
        <div className={classes.navGrow} />
        <div className={classes.navSearch}>
          <div className={classes.navSearchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search directory..."
            classes={{
              root: classes.navInputRoot,
              input: classes.navInputInput,
            }}
          />
        </div>
        <div className={classes.navGrow} />
        <div className={classes.navSectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            {imageUrl === defaultPic ? (
              <Avatar className={classes.navAvatar}>{avatarLetters.charAt(0)}</Avatar>
            ) : avatarLetters == "" ? (
              <AccountCircle />
              ) : (
              <img src={imageUrl} className={classes.profilePic} />
            )}
          </IconButton>
        </div>
        <div className={classes.navSectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
          {<RenderMenu 
            anchorEl={anchorEl} 
            isMenuOpen={isMenuOpen} 
            handleMenuClose={this.handleMenuClose} 
          />}
        {<RenderMobileMenu 
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          isMobileMenuOpen={isMobileMenuOpen}
          handleMenuClose={this.handleMenuClose}
          handleMobileMenuClose={this.handleMenuClose}
          handleProfileMenuOpen={this.handleProfileMenuOpen}
        />}
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

export default connect(mapStateToProps)(withStyles(styles)(NavBar))