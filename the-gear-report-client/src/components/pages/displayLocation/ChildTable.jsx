import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation, getNode } from '../../../redux/actions/tcActions'
import CragMarkup from './util/CragMarkup'
import CliffMarkup from './util/CliffMarkup'
import { withRouter } from 'react-router-dom'
//Mui
import Table from '@material-ui/core/Table'


class ChildTable extends Component {

  handleRowClick = (child) => {
    child.type === 'route' ?
    this.props.getNode(child.id) :
    this.props.updateSearchLocation(child.id, this.props.country)

    this.props.history.push(`/location/${child.id}`)
  }

  getMarkup = (areaType, children) => {
   console.log(areaType);
    if(areaType === 'Crag'){
      return <CragMarkup children={children} handleClick={this.handleRowClick} />
    }
    else if(areaType === 'Cliff'){
      console.log('Cliff');
      return <CliffMarkup children={children} handleClick={this.handleRowClick} />
    }
  }

  render() {
    const { areaType, children } = this.props
    console.log(children, areaType);
    return (
      <Fragment>
        {children && areaType &&
        <Table>
         {this.getMarkup(areaType, children)}
        </Table>}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  country: state.UI.country,
  areaType: state.UI.subType,
  children: state.UI.children
})

const mapDispatchToProps = {
  getNode,
  updateSearchLocation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChildTable))