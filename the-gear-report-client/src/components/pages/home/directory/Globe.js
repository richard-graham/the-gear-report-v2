import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { updateLocation, resetLocation } from '../../../../redux/actions/UIActions'
import { connect } from 'react-redux'
import { checkIfCrag } from '../../../../util/functions'
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


const styles = { 
  map: {
    height: 484,
    width: '100%'
  },
  smallMap: {
    height: 315,
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
    this.props.updateLocation(child)
  }

  componentWillUnmount = () => {
    if(!this.props.location.loading){
      this.props.resetLocation()
    }
  }
  
  render() {
    const { classes, location, country, loading } = this.props
    const position = location.Geo ? [location.Geo[1], location.Geo[0]] : '' //some locations don't have coords
    const children = []
    const getChildren = (rootObj) => {
      Object.entries(rootObj).forEach(entry => {
        if(checkIfCrag(entry[1].AreaType)){
          children.push(entry[1])
        } else if (country[entry[1].NodeID]){
          getChildren(country[entry[1].NodeID])
        }

      })
    }
    country && country[location.NodeID] && getChildren(country[location.NodeID])
    return (
      <Fragment>
      <Map 
        className={this.props.size === 'small' ? classes.smallMap : classes.map} 
        center={position} 
        zoom={checkIfCrag(location.AreaType) ? 14 : location.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children.length > 0 && children.map((child, i) => {
          if (child.Geo) {
            return (
              <Marker 
                position={[child.Geo[1], child.Geo[0]]}
                icon={homeIcon}
                key={i}
              >
                 <Popup>
                  {child.Name}
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
        {children.length === 0 && !loading && location.Geo ? (
          <Marker 
            position={[location.Geo[1], location.Geo[0]]}
            icon={homeIcon}
            key={'location'}
          >
              <Popup>
              {location.Name}
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
  updateLocation,
  resetLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Globe))
