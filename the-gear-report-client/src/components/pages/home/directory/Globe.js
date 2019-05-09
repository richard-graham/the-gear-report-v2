import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
//Redux
import { connect } from 'react-redux'
import { updateUserLocation, updateUserCountry } from '../../../../redux/actions/userActions'
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

  state = {
    
  }

  componentDidMount = () => {
    this.props.updateUserLocation()
    this.props.updateUserCountry()
  }

  
  render() {
    const { classes, user } = this.props
    const position = [user.lat, user.lng]
    
    return (
      <Fragment>
      { user.lat && <Map className={classes.map} center={position} zoom={user.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { user.haveUsersLocation &&
        <Marker 
          position={position}
          icon={homeIcon}
        >
          <Popup>
            Your Location
          </Popup>
        </Marker>
        }
      </Map>
      }
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  updateUserLocation,
  updateUserCountry
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Globe))
