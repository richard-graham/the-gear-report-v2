import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


const styles = {
  map: {
    height: 484,
    width: '100%'
  }
}

var homeIcon = L.icon({
  iconUrl: 'http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/96/map-marker.png',
  iconSize:     [48, 48], // size of the icon
  iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -48] // point from which the popup should open relative to the iconAnchor
});

class Globe extends Component {
  
  render() {
    const { classes, user, location, country } = this.props
    const position = [location.Geo[1], location.Geo[0]]   
    const children = []
    const getChildren = (rootObj) => {
      Object.entries(rootObj).forEach(entry => {
        if(entry[1].AreaType === "Cr" ||
          entry[1].AreaType === "Cl" ||
          entry[1].AreaType === "Fi"){
          children.push(entry[1])
        } else if (country[entry[1].NodeID]){
          getChildren(country[entry[1].NodeID])
        }

      })
    }
    country && country[location.NodeID] && getChildren(country[location.NodeID])
    return (
      <Fragment>
      <Map className={classes.map} center={position} zoom={location.zoom}>
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
              
              </Marker>
            )
        }})}
        
      </Map>
    </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  location: state.UI.location,
  country: state.UI.country
})

export default connect(mapStateToProps)(withStyles(styles)(Globe))
