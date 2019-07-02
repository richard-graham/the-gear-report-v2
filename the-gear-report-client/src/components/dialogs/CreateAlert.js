import React, { Fragment } from 'react';
import { uploadAlertImage, postAlert, resetAlertImages } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'
import { checkIfCrag, checkIfBelowCrag } from '../../util/functions'
import Search from '../../util/Search'
import axios from 'axios'
//Mui
import Grid from '@material-ui/core/Grid'
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
import Select from '@material-ui/core/Select'
//Icons
import EditIcon from '@material-ui/icons/Edit'

import { Typography } from '@material-ui/core';

class CreateAlert extends React.Component {

  state = {
    title: '',
    body: '',
    use: true,
    pick: false,
    refinements: { refinement1: {} },
    errors: []
  }

  componentWillReceiveProps = (nextProps) => {
    var openedWithLoc = !this.props.open && nextProps.open && this.props.location ? true : false
    var closed = this.props.open && !nextProps.open ? true : false
    const { type, subType } = this.props.location

    if(closed) this.setState({ 
      body: '',
      use: true,
      pick: false,
      alertLocation: {},
      refinements: {}
    })
    if(openedWithLoc &&
      checkIfCrag(type, subType)){
        this.getRelatives(this.props.location.id)
      }
    if(openedWithLoc &&
      checkIfBelowCrag(type, subType)){
        this.getRelatives(this.props.location.parentID)
      }
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
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
        pick: true,
        refinements: { refinement1: {} },
        alertLocation: {}
      })
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadAlertImage(formData)
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleRefinement = (e) => {
    e.persist()
    e.target.value ?
    (axios.get(`/tc/node/location/${e.target.value}/children`)
      .then(res => {
        const { data } = res
        var nameArr = e.target.name.split('')
        var iteration = Number(nameArr[nameArr.length - 1])
        this.setState({ 
          refinements: {
            ...this.state.refinements,
            [e.target.name]: {
              name: data.data.name,
              id: data.data.id,
              children: data.children
            },
            [`refinement${iteration + 1}`]: {}
          }
        })
      })
    ) : (
      this.setState({ refinements: {[e.target.name]: {} }})
    )
  }

  handleSubmit = (event) => {
    const { alertLocation, refinements, title, body } = this.state
    let errorsToAdd = []
    if(!alertLocation) errorsToAdd.push('Please select a crag')
    if(title === '') errorsToAdd.push('Please add a title')
    if(body === '') errorsToAdd.push('Please add a description')
    if(errorsToAdd.length > 0) return this.setState({ errors: errorsToAdd })

    event.preventDefault()
    var imageObj = {}
    var locations = []
    var locationNames = []
    // handle images
    this.props.images.forEach((image, i) => {
      imageObj[i] = image
    })
    // handle locations
    alertLocation.ancestors.forEach(ancestor => {
      locations.push(ancestor.id)
      locationNames.push(ancestor.name)
    })
    locations.push(alertLocation.id)
    locationNames.push(alertLocation.name)
    Object.keys(refinements).forEach(refinement => {
      if(refinements[refinement].id !== undefined) {
        locations.push(refinements[refinement].id)
        locationNames.push(refinements[refinement].name)
      }
    })
    this.props.postAlert({ 
      body: this.state.body,
      title: this.state.title,
      images: this.props.images,
      locations: locations,
      locationNames: locationNames
     })
     this.setState({
       title: '',
       body: '',
     })
     this.props.resetAlertImages()
     this.props.closeAllDialogs() 
  }

  getRelatives = (id) => {
    axios.get(`/tc/node/location/${id}/relatives`)
      .then(res => {
        const { data } = res
        var result = []
        data.data.ancestors.forEach(ancestor => {
          result.push({
            id: ancestor.id,
            name: ancestor.name
          })
        })
        this.setState({ 
          alertLocation: {
            name: data.data.name,
            id: data.data.id,
            ancestors: result,
            children: data.children
          },
          use: true,
          pick: false
        })
      })
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
      alertLocation,
      refinements,
      errors
    } = this.state

    const renderLocOptions = location && (checkIfCrag(location.type, location.subType) ||
    checkIfBelowCrag(location.type, location.subType)) ? true : false

    return (
      <Fragment>
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
            <br />
            <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden' />
            <MyButton styles={{marginTop: 5, marginBottom: 5}} tip='Add image to alert' onClick={this.handleEditPicture} btnClassName='button'>
              {loading ? <CircularProgress size={25}/> : <EditIcon color='primary' />}
            </MyButton>
            <br />
            {(renderLocOptions || (alertLocation && alertLocation.id)) && 
            <FormControl component="fieldset" className={classes.formControl}>
              <Grid container>
                <Grid item xs={6} >
                  <FormLabel component="legend">Use this Crag</FormLabel>
                  <FormGroup className={classes.formGroup}>
                    <FormControlLabel
                      className={classes.formLabel}
                      control={<Checkbox checked={use} onChange={() => this.handleFormControl('use')} />}
                      label={alertLocation ? alertLocation.name : location.name}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormLabel component="legend">Pick other Crag</FormLabel>
                  <FormGroup className={classes.formGroup}>
                    <FormControlLabel
                      className={classes.formLabel}
                      control={<Checkbox checked={pick} onChange={() => this.handleFormControl('pick')} />}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </FormControl>}
            
            {renderLocOptions && !use
               ? <Search 
                searchType={'Alert'} 
                returnIdToParent={this.getRelatives} 
              />
              : use && alertLocation && alertLocation.id
              ? ''
              : !renderLocOptions
              ? <Search 
                searchType={'Alert'} 
                returnIdToParent={this.getRelatives} 
              />
              : ''}



            {alertLocation && alertLocation.children &&
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <Select
                  native
                  fullWidth
                  className={classes.select}
                  onChange={this.handleRefinement}
                  inputProps={{
                    name: 'refinement1',
                    id: 'cChild1'
                  }}
                >
                  <option value={''}>None</option>
                  {alertLocation.children
                    .sort((a, b) => (a.name > b.name) ? 1 : -1)
                    .map((child, i) => {
                    return (
                      <option value={child.id} name={child.name} key={i}>
                        {child.name}
                      </option>)
                  })}
                </Select>


                {refinements.refinement2 && Object.keys(refinements).map((refinement, i) => {
                  // Assigns children and sorts alphabetically
                  var children = (
                    refinements[refinement].children ? 
                      refinements[refinement].children.sort((a, b) => (a.name > b.name) ? 1 : -1) : [])

                  return children && Object.keys(children).length > 0 ? (
                    <Select
                      className={classes.select}
                      native
                      fullWidth       
                      onChange={this.handleRefinement}
                      inputProps={{
                        name: `refinement${i + 2}`,
                        id: `cChild${i + 2}`
                      }}
                      key={i}
                    >
                      <option value={''}>None</option>
                      {children.map((child, i) => {
                        return (
                          <option value={child.id} name={child.name} key={i}>
                            {child.name}
                          </option>)
                      })}
                    </Select>
                  ) : ''
                })}
              </FormControl>
            </form>
            }
            {errors ? errors.map((err, i) => {
              return <Typography align='center' color='secondary' key={i}>{err}</Typography> 
            })
            : ''}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAllDialogs} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" type='submit'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  formControl: {
    marginTop: 5,
    minWidth: '100%',
    textAlign: 'center'
  },
  formGroup: {
    alignContent: 'center'
  },
  formLabel: {
    marginRight: 0
  },
  select: {
    marginBottom: '10px'
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

