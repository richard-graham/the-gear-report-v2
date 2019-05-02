import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


export class RenderMenu extends Component {
  render() {
    const { anchorEl, isMenuOpen, handleMenuClose } = this.props
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    )
  }
}

const styles = {

}

export default RenderMenu
