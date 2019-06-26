import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
//Mui
import { withStyles } from '@material-ui/core/styles'

export class AlertImageGallery extends Component {
  render() {
    const { images, classes } = this.props
    const items = []
    images && images.map((image, i) => {
      return items.push({
        original: image,
        thumbnail: image,
        originalClass: classes.pics,
      })
    })
    return (
      <ImageGallery 
        items={items}  
        showPlayButton={false}
      />
    )
  }
}

const styles = {
  pics: {
    width: '100%',
    height: 'auto',
  },
  container: {
  }
}

export default withStyles(styles)(AlertImageGallery)
