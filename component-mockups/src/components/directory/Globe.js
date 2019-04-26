import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
//Redux
import { connect } from 'react-redux'
import { updateUserLocation, updateUserCountry } from '../../redux/actions/userActions'
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'


const styles = {
  map: {
    height: 500,
    width: '80%'
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
    fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(position => {
          this.props.updateUserCountry({
            countryName: position.country_name
          })
        })
        .then(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 11,
        haveUsersLocation: true
      })
    // })
      
    }, () => { // if user says no to tracking location use api
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(position => {
          this.props.updateUserLocation({
            lat: position.latitude,
            lng: position.longitude,
            zoom: 5,
            haveUsersLocation: false,
            countryName: position.country_name
          })
        })
    });
  }
        )}

  
  render() {
    const { classes, user } = this.props
    console.log(this.props);
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
