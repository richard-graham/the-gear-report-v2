import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { uploadUserImage } from '../../../redux/actions/userActions'
import dayjs from 'dayjs'
//Mui
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'

export class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadUserImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  render() {
    const { 
      classes,
      user : {
        credentials: {
          imageUrl,
          handle,
          email,
          city,
          createdAt
        }
      }
    } = this.props
    return (
      <Paper className={classes.paper}>
        <br />
        <Tooltip title='Upload Photo' placement='right'>
          <img src={imageUrl} className={classes.profilePic} onClick={this.handleEditPicture}/>
        </Tooltip>
        <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden'/>
        <Typography variant='title'>{handle}</Typography>
        <br />
        <Typography variant='subtitle1'>Email</Typography>
        <Typography variant='subtitle2'>{email}</Typography>
        <br />
        <Typography variant='subtitle1'>City</Typography>
        <Typography variant='subtitle2'>{city}</Typography>
        <br />
        <Typography variant='subtitle1'>Member Since</Typography>
        <Typography variant='subtitle2'>{dayjs(createdAt).format('MMM YYYY')}</Typography>
        <br />
        
      </Paper>
    )
  }
}

const styles = theme => ({
  ...theme,
  paper: {
    width: '100%',
    height: '100%'
  },
  profilePic: {
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: '50%'
  }
})

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  uploadUserImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
