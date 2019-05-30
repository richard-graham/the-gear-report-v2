import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
//Mui
import { withStyles } from '@material-ui/core/styles'

const minimumHeight = 600

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
        additionalClass={classes.container}
      />
    )
  }
}

const styles = {
  pics: {
    width: '100%',
    height: 'auto',
    minHeight: 480,
    paddingLeft: '30%',
    paddingRight: '30%',
  },
  container: {
    minHeight: 620
  }
}

export default withStyles(styles)(AlertImageGallery)
