import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation, getNode } from '../../../redux/actions/tcActions'
import { getAlertsByLocation } from '../../../redux/actions/dataActions'
import CragMarkup from './util/CragMarkup'
import CliffMarkup from './util/CliffMarkup'
import { withRouter } from 'react-router-dom'
//Mui
import Table from '@material-ui/core/Table'


class ChildTable extends Component {

  handleRowClick = (child) => {
    child.type === 'route' ?
    this.props.getNode(child.id) : (
    this.props.updateSearchLocation(child.id, this.props.country) &&
    this.props.getAlertsByLocation(child.id) )
    this.props.history.push(`/location/${child.id}`)
  }

  getMarkup = (subType, children, alerts) => {
    if(subType === 'Crag'){
      return <CragMarkup 
              children={children} 
              handleClick={this.handleRowClick} 
              alerts={alerts} 
            />
    }
    else if(subType === 'Cliff'){
      return <CliffMarkup 
              children={children} 
              handleClick={this.handleRowClick} 
              alerts={alerts} 
            />
    }
  }

  render() {
    const { subType, children, alerts } = this.props
    return (
      <Fragment>
        {children && subType &&
        <Table>
         {this.getMarkup(subType, children, alerts)}
        </Table>}
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  getNode,
  updateSearchLocation,
  getAlertsByLocation
}

export default withRouter(connect(null, mapDispatchToProps)(ChildTable))