import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// leaflet
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

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
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        haveUsersLocation: true,
        zoom: 9
      })
    }, () => { // if user says no to tracking location use api
      console.log('oh no no location')
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(position => {
          console.log(position)
          this.setState({
            location: {
              lat: position.latitude,
              lng: position.longitude,
            },
            haveUsersLocation: true,
            zoom: 6
          })
        })
    });
  }

  render() {
    const { classes } = this.props
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <div className={classes.home}>
        <Map className={classes.map} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { this.state.haveUsersLocation &&
          <Marker 
            position={position}
            icon={greenIcon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          }
        </Map>
      </div>
    )
  }
}

export default withStyles(styles)(home)
