import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation } from '../../../redux/actions/tcActions'
import cragMarkup from './util/cragData'
import cliffMarkup from './util/cliffData'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'


class ChildTable extends Component {

  getMarkup = (areaType, children) => {
    if(areaType === 'Crag'){
      return cragMarkup(children)
    }
    else if(areaType === 'Cliff'){
      return cliffMarkup(children)
    }
  }

  render() {
    const { areaType, children, classes } = this.props
    
    return (
      <Table className={classes.table}>
       {this.getMarkup(areaType, children)}
      </Table>
    )
  }
}

const styles = theme => ({
  // table: {
  //   width: '100%',
  //   overflowX: 'auto',
  // },
})

const mapStateToProps = (state) => ({
  country: state.UI.country
})

export default connect(mapStateToProps, { updateSearchLocation })(withStyles(styles)(ChildTable))