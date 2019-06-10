import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderMenu from './NavBarMenus/RenderMenu'
import { RenderMobileMenu } from './NavBarMenus/RenderMobileMenu'
import ProfilePic from '../../util/ProfilePic'
import Search from '../../util/Search'
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
    const { classes, user } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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
            {user ? <ProfilePic user={user} size={30} /> : ''}
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