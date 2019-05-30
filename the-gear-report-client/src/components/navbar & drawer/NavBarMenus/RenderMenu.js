import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logoutUser } from '../../../redux/actions/userActions'
import { Link } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Divider from '@material-ui/core/Divider'

class RenderMenu extends Component {
  handleLogout = () => {
    this.props.logoutUser()
    this.props.handleMenuClose()
  }
  render() {
    const { 
      anchorEl, 
      isMenuOpen, 
      handleMenuClose, 
      user: { 
        authenticated,
        credentials: {
          handle
        }
       }
    } = this.props
    return (
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {authenticated ? <MenuItem onClick={handleMenuClose} component={Link} to={`/profile/${handle}`}>Profile</MenuItem> : ''}
        { authenticated ?
        <MenuItem 
          onClick={this.handleLogout}
        >Logout</MenuItem> :
        <MenuList>
          <MenuItem onClick={handleMenuClose} component={Link} to='/login'>Sign In</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to='/signup'>Register</MenuItem>
        </MenuList>
        }
      </Menu>
    )
  }
}

const styles = theme => ({
  ...theme
})

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RenderMenu))
