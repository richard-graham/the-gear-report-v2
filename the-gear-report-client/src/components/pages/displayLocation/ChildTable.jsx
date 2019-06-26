import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation, getNode } from '../../../redux/actions/tcActions'
import { getAlertsByLocation } from '../../../redux/actions/dataActions'
import CragMarkup from './util/CragMarkup'
import CliffMarkup from './util/CliffMarkup'
import { withRouter } from 'react-router-dom'
import { checkIfCrag, checkIfBelowCrag } from '../../../util/functions'
//Mui
import Table from '@material-ui/core/Table'


class ChildTable extends Component {

  handleRowClick = (child) => {
    if(child.type === 'route' || child.type === 'boulder'){
      this.props.getNode(child.id)
      this.props.getAlertsByLocation(child.id)
    } else {
      this.props.updateSearchLocation(child.id, this.props.country)
      this.props.getAlertsByLocation(child.id)
    }
    this.props.history.push(`/location/${child.id}`)
  }

  getMarkup = (subType, children, alerts) => {
    if(checkIfCrag(null, subType)){
      return <CragMarkup 
              children={children} 
              handleClick={this.handleRowClick} 
              alerts={alerts} 
            />
    }
    else if(checkIfBelowCrag(null, subType)){
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