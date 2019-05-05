import React from 'react';
import { uploadImage } from '../../redux/actions/userActions'
import { connect } from 'react-redux'
//Mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../../util/MyButton'
import EditIcon from '@material-ui/icons/Edit'

class CreateAlert extends React.Component {
  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
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
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden' />
            <MyButton tip='Edit profile picture' onClick={this.handleEditPicture} btnClassName='button'>
              <EditIcon color='primary' />
            </MyButton>

          </DialogContent>
          <DialogActions>
            <Button onClick={closeAllDialogs} color="primary">
              Cancel
            </Button>
            <Button onClick={closeAllDialogs} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { uploadImage })(CreateAlert)