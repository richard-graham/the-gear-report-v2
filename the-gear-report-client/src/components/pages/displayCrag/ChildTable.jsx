import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation, getNode } from '../../../redux/actions/tcActions'
import CragMarkup from './util/CragMarkup'
import CliffMarkup from './util/CliffMarkup'
import { withRouter } from 'react-router-dom'
//Mui
import Table from '@material-ui/core/Table'


class ChildTable extends Component {

  handleRowClick = (child) => {
    console.log(child);
    child.type === 'route' ?
    this.props.getNode(child.id) :
    this.props.updateSearchLocation(child.id, this.props.country)

    this.props.history.push(`/location/${child.id}`)
  }

  getMarkup = (areaType, children) => {
    if(areaType === 'Crag'){
      return <CragMarkup children={children} handleClick={this.handleRowClick} />
    }
    else if(areaType === 'Cliff'){
      return <CliffMarkup children={children} handleClick={this.handleRowClick} />
    }
  }

  render() {
    const { areaType, children } = this.props
    
    return (
      <Table>
       {children && this.getMarkup(areaType, children)}
      </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  country: state.UI.country
})

const mapDispatchToProps = {
  getNode,
  updateSearchLocation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChildTable))