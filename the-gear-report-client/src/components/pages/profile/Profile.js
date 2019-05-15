import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { uploadUserImage } from '../../../redux/actions/userActions'
import dayjs from 'dayjs'
import UpdateDetails from '../../dialogs/UpdateDetails'
//Mui
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'


export class Profile extends Component {
  state = {
    updateOpen: false
  }

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

  handleChangeDetails = () => {
    this.setState({ updateOpen: true })
  }

  toggleClose = () => {
    this.setState({ updateOpen: false })
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
          createdAt,
          occupation,
          bio,
        }
      }
    } = this.props
    return (
      <div className={classes.profileContainer}>
        <Paper className={classes.profilePaper}>
          <br />
          <Tooltip title='Change Photo' placement='right'>
            <img src={imageUrl} className={classes.profilePic} onClick={this.handleEditPicture} alt='User Profile' />
          </Tooltip>
          <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden'/>
          <Typography variant='h6'>{handle}</Typography>
          <br />
          <Typography variant='subtitle1'>Email</Typography>
          <Typography variant='subtitle2'>{email}</Typography>
          <br />
          <Typography variant='subtitle1'>Occupation</Typography>
          <Typography variant='subtitle2'>{occupation}</Typography>
          <br />
          <Typography variant='subtitle1'>City</Typography>
          <Typography variant='subtitle2'>{city}</Typography>
          <br />
          <Typography variant='subtitle1'>Bio</Typography>
          <Typography variant='subtitle2'>{bio}</Typography>
          <br />
          <Typography variant='subtitle1'>Member Since</Typography>
          <Typography variant='subtitle2'>{dayjs(createdAt).format('MMM YYYY')}</Typography>
          <br />
          <Button color='primary' variant='contained' onClick={this.handleChangeDetails}>
            Update Details 
          </Button>
        </Paper>
        <UpdateDetails 
          open={this.state.updateOpen} 
          toggleClose={this.toggleClose} 
          imageUrl={imageUrl}
          handle={handle}
          email={email}
          city={city}
          createdAt={createdAt}
          occupation={occupation}
          bio={bio}
        />
      </div>
    )
  }
}

const styles = theme => ({
  ...theme,
  profilePaper: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      minWidth: 320,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: 50
    },
    marginTop: 150,
    alignSelf: 'center',
    minWidth: 520,
    paddingBottom: 40
  },
  profilePic: {
    height: 100,
    width: 100,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: '50%'
  },
  profileContainer: {
    width: '100%',
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {
  uploadUserImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
