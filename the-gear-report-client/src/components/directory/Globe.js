import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { resetLocation } from '../../redux/actions/UIActions'
import { connect } from 'react-redux'
import { isCragOrUnder } from '../../util/functions'
import { updateSearchLocation } from '../../redux/actions/tcActions'
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


const styles = { 
  map: {
    height: '100%',
    width: '100%'
  },
  popupButton: {
    margin: 5
  }
}

var homeIcon = L.icon({
  iconUrl: 'http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/96/map-marker.png',
  iconSize:     [48, 48], // size of the icon
  iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -48] // point from which the popup should open relative to the iconAnchor
});

class Globe extends Component {

  handleClick = (child) => {
    this.props.updateSearchLocation(child.id, this.props.country)
  }

  componentWillUnmount = () => {
    if(!this.props.location.loading){
      this.props.resetLocation()
    }
  }
  
  render() {
    const { classes, location, country, loading } = this.props
    const position = location.geo ? [location.geo[1], location.geo[0]] : '' //some locations don't have coords
    const children = []
    const getChildren = (rootObj) => {
      Object.entries(rootObj).forEach(entry => {
        if(isCragOrUnder(entry[1].type)){
          children.push(entry[1])
        } else if (country[entry[1].id]){
          getChildren(country[entry[1].id])
        }

      })
    }
    country && country[location.id] && getChildren(country[location.id])
    return (
      <Fragment>
      <Map 
        className={classes.map} 
        center={position} 
        zoom={isCragOrUnder(location.type, location.additionalInfo ? location.subType : null) ? 14 : location.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children.length > 0 && children.map((child, i) => {
          if (child.geo) {
            return (
              <Marker 
                position={[child.geo[1], child.geo[0]]}
                icon={homeIcon}
                key={i}
              >
                 <Popup>
                  {child.name}
                  <br />
                  <button 
                    className={classes.popupButton}
                    onClick={() => this.handleClick(child)}
                  >
                    View
                  </button>
                </Popup>
              </Marker>
            )
          }
          return null
        })}
        {children.length === 0 && !loading && location.geo ? (
          <Marker 
            position={[location.geo[1], location.geo[0]]}
            icon={homeIcon}
            key={'location'}
          >
              <Popup>
              {location.name}
            </Popup>
          </Marker>
        ) : ''}
      </Map>
    </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  location: state.UI.location,
  country: state.UI.country,
  loading: state.UI.loading
})

const mapDispatchToProps = {
  resetLocation,
  updateSearchLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Globe))
