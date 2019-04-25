import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
//Redux
import { connect } from 'react-redux'
import { getUserLocation } from '../redux/actions/userActions'

const styles = {
  map: {
    height: 500 
  }
}

var greenIcon = L.icon({
  iconUrl: 'http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/96/map-marker.png',
  iconSize:     [48, 48], // size of the icon
  iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -48] // point from which the popup should open relative to the iconAnchor
});

export class home extends Component {
  state = {
    location: {
      lat: -41.162026499999996,
      lng: 172.0145516,
    },
    haveUsersLocation: false,
    zoom: 5,
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.props.getUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 10,
        haveUsersLocation: true
      })
    }, () => { // if user says no to tracking location use api
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(position => {
          this.props.getUserLocation({
            lat: position.latitude,
            lng: position.longitude,
            zoom: 5,
            haveUsersLocation: false
          })
        })
    });
  }

  render() {
    const { classes, userLocation } = this.props
    const position = [userLocation.lat, userLocation.lng]
    return (
      <div className={classes.home}>
        { userLocation && <Map className={classes.map} center={position} zoom={userLocation.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { userLocation.haveUsersLocation &&
          <Marker 
            position={position}
            icon={greenIcon}
          >
            <Popup>
              Your Location
            </Popup>
          </Marker>
          }
        </Map>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.user.location
})

export default connect(mapStateToProps, { getUserLocation })(withStyles(styles)(home))
