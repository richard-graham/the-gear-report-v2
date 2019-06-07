import React from 'react';
import { uploadAlertImage, postAlert, resetAlertImages } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'
import { checkIfCrag } from '../../util/functions'
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
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//Icons
import EditIcon from '@material-ui/icons/Edit'

class CreateAlert extends React.Component {

  state = {
    title: '',
    body: '',
    use: true,
    pick: false,
    locs: { 
      0: 11737723
    }
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

  handleFormControl = (arg) => {
    if (arg === 'use'){
      this.setState({
        use: true,
        pick: false
      })
    } else {
      this.setState({
        use: false,
        pick: true
      })
    }
  }


  handleSelectChange = (e, i) => {
    const state = this.state
    state.locs[e.target.name + 1] = e.target.value
    if (Object.keys(this.state.locs).length === Number(e.target.name) + 1){ // if the last input is being modded add a key in state
      state.locs[Object.keys(this.state.locs).length.toString()] = '' 
    }
    this.setState({ state })
  }

  render() {
    const { 
      classes,
      open, 
      closeAllDialogs, 
      loading,
      location
    } = this.props
    const {
      use, 
      pick,
    } = this.state
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
            <MyButton styles={{marginTop: 5, marginBottom: 5}} tip='Add image to alert' onClick={this.handleEditPicture} btnClassName='button'>
              {loading ? <CircularProgress size={25}/> : <EditIcon color='primary' />}
            </MyButton>
            <br />
            {location && checkIfCrag(location.AreaType) && 
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Use this location</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={use} onChange={() => this.handleFormControl('use')} value="gilad" />}
                  label={location.Name}
                />
              </FormGroup>
              <FormLabel component="legend">Pick other location</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={pick} onChange={() => this.handleFormControl('pick')} value="gilad" />}
                />
              </FormGroup>
              {pick && <h1>test</h1>}

            </FormControl>}
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
  formControl: {
    marginTop: 5
  }
});

const mapActionsToProps = {
  uploadAlertImage,
  postAlert,
  resetAlertImages
}

const mapStateToProps = state => ({
  images: state.data.newAlert.images,
  loading: state.data.loading,
  country: state.UI.country,
  location: state.UI.location
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateAlert))

// manually selecting location

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   var imageObj = {}
  //   this.props.images.forEach((image, i) => {
  //     imageObj[i] = image
  //   });
  //   this.props.postAlert({ 
  //     body: this.state.body,
  //     title: this.state.title,
  //     images: this.props.images
  //    })
  //    this.setState({
  //      title: '',
  //      body: '',
  //    })
  //    this.props.resetAlertImages()
  //    this.props.closeAllDialogs()
  // }

              //   {/* {location && (!checkIfCrag(location.AreaType) || pick) &&
                
              //   <Fragment>
              //   //Make locs key have a value of the NodeID and the parents NodeID
              //     {Object.keys(locs).map((key, i) => {
              //       console.log(locs[key], 'ping');
              //       return (
              //         <Select
              //           value={locs[key]}
              //           onChange={(e) => this.handleSelectChange(e)}
              //           inputProps={{
              //             name: key,
              //             id: `input${key}`
              //           }}
              //         >
              //           {Object.keys(country[locs[key]]).map((loc, i) => {
              //             return <MenuItem 
              //                       value={country[locs[key]][loc].NodeID}
              //                       key={i}
              //                       >{loc}
              //                     </MenuItem>
              //           })}
              //         </Select>
              //       )
              //     })}
                
                  

              //   </Fragment>
              // }