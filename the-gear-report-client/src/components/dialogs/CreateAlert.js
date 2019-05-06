import React from 'react';
import { uploadAlertImage, postAlert } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../../util/MyButton'
//Icons
import EditIcon from '@material-ui/icons/Edit'

class CreateAlert extends React.Component {

  state = {
    title: '',
    body: '',
  }

  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadAlertImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    var imageObj = {}
    this.props.images.forEach((image, i) => {
      imageObj[i] = image
    });

    this.props.postAlert({ 
      body: this.state.body,
      title: this.state.title,
      images: this.props.images
     })
     this.setState({
       title: '',
       body: '',
       images: null
     })
     this.props.closeAllDialogs()
  }


  render() {
    const { open, closeAllDialogs } = this.props
    return (
      <div>
        <Dialog
          open={open}
          onClose={closeAllDialogs}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create an Alert</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in all the fields below with as much detail as possible
            </DialogContentText>
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type='text'
              fullWidth
              placeholder='A short alert description'
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="body"
              label="Description"
              placeholder='An in-depth alert description'
              type='text'
              fullWidth
              multiline
              rows={3}
              onChange={this.handleChange}
            />
            <br />
            <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden' />
            <MyButton tip='Add image to alert' onClick={this.handleEditPicture} btnClassName='button'>
              <EditIcon color='primary' />
            </MyButton>

          </DialogContent>
          <DialogActions>
            <Button onClick={closeAllDialogs} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const mapActionsToProps = {
  uploadAlertImage,
  postAlert
}

const mapStateToProps = state => ({
  images: state.data.newAlert.images
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateAlert))