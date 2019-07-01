import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { uploadUserImage } from '../../../redux/actions/userActions'
import { getAlertsByUser, getUserData } from '../../../redux/actions/dataActions'
import moment from 'moment'
import UpdateDetails from '../../dialogs/UpdateDetails'
//Mui
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress';


export class Profile extends Component {

  state = {
    updateOpen: false,
    loading: false
  }

  componentDidMount = () => {
    if (!this.props.loading &&
      this.props.userProfile.user.handle !== 
      this.props.match.params.userHandle){
      this.props.getUserData(this.props.match.params.userHandle) 
    }
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
      loading,
      user
    } = this.props

    const {
      imageUrl,
      handle,
      email,
      city,
      createdAt,
      occupation,
      bio
    } = this.props.userProfile.user

    const isMyProfile = handle === user.credentials.handle ? true : false

    return loading ? (
      <CircularProgress className={classes.progress} size={70} />
    ) : imageUrl ? (
      <div className={classes.profileContainer}>
        <Paper className={classes.profilePaper}>
          {isMyProfile ? (
            <Fragment>
              {user.credentials.loadingImage ? (
                <div className={classes.profilePicLoading}>
                  <CircularProgress className={classes.profilePicSpinner} />
                </div>
              ) : (
                <Fragment>
                  <Tooltip title='Change Photo' placement='right'>
                    <img src={imageUrl} className={classes.profilePic} onClick={this.handleEditPicture} alt='User Profile' />
                  </Tooltip>
                  <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden'/>
                </Fragment>
              )}
              
            </Fragment>
          ) : (
            <img src={imageUrl} className={classes.profilePic} onClick={this.handleEditPicture} alt='User Profile' />
          )}
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
          <Typography variant='subtitle2'>{moment(createdAt).format('MMM YYYY')}</Typography>
          <br />
          {isMyProfile && 
          <Button color='primary' variant='contained' onClick={this.handleChangeDetails}>
            Update Details 
          </Button>}
        </Paper>
          <UpdateDetails 
            open={this.state.updateOpen} 
            toggleClose={this.toggleClose} 
            user={user}
          />
      </div>
    ) : ''
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
    minHeight: 593,
    paddingBottom: 40
  },
  profilePic: {
    height: 100,
    width: 100,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: '50%'
  },
  profilePicLoading: {
    height: 100,
    width: 100,
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  profilePicSpinner: {
    position: 'relative',
    top: '25%'
  },
  profileContainer: {
    width: '100%',
    heigh: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  progress: {
    position: 'absolute',
    top: '50%'
  }
})

const mapStateToProps = state => ({
  user: state.user,
  userProfile: state.data.userProfile,
  loading: state.data.userProfile.loading
})

const mapActionsToProps = {
  uploadUserImage,
  getAlertsByUser,
  getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
