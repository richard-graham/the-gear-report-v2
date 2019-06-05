import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//Mui
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
//Icons
import SearchIcon from '@material-ui/icons/Search';


export class Search extends Component {


  render() {
    const { classes } = this.props
    return (
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
    )
  }
}

const styles = (theme) => ({
  ...theme
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search))
