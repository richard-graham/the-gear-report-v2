import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//Mui
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography'

export class Breadcrumb extends Component {

  filterAncestors = (ancArr) => {
    let locArr = []
    ancArr.forEach(anc => {
      if(anc.subType !== 'Region') locArr.push(anc)
    })
    return locArr
  }

  render() {
    const { location } = this.props
    const locations = location.ancestors ? this.filterAncestors(location.ancestors) : []
    locations.push(location)
    return (
      <Breadcrumbs style={{ textDecoration: 'none' }}>
        {locations.length > 1 && locations.map((loc, i) => {
          return locations.length !== i + 1 ? (
            <Link
              key={i} 
              style={{ textDecoration: 'none' }}
              to={`/location/${loc.id}`}
              >
              <Typography color='textSecondary' >{loc.name}</Typography>
            </Link>
          ) : (
            <Typography color='textPrimary' key={i}>{loc.name}</Typography>
          )
        })}
      </Breadcrumbs>
    )
  }
}

const mapStateToProps = (state) => ({
  location: state.UI.location
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb)
