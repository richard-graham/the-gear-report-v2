import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'
//Mui
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';


export class UpdateDetails extends Component {
  state = {
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUserData = {
      ...this.props.user,
      ...this.state,
      handle: this.props.user.handle
    }
    //fire dispatch
    this.props.editUserDetails(newUserData)
    //reset state
    const newObj = this.state
    Object.keys(this.state).forEach(key => newObj[key] = '')
    this.setState(newObj)
    this.props.toggleClose()
  }

  render() {
    const { 
      classes, 
      UI: { errors } ,
      open,
      toggleClose,
      user
    } = this.props

    return (
        
      <Dialog 
        open={open} 
        onClose={toggleClose}
      >
        <DialogContent style={{ margin: 40 }}>
          <form>
            <Typography variant='h6' style={{ marginBottom: 16 }}>Edit Details</Typography>
            <TextField 
              name='email'
              variant='outlined'
              margin='dense'
              type='text'
              className={classes.signupTextField}
              label='Email' 
              onChange={this.handleChange}
              defaultValue={user.email}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <br/>
            <TextField 
              name='occupation'
              variant='outlined'
              margin='dense'
              type='text'
              className={classes.signupTextField}
              placeholder='Enter Your Occupation'
              label='Occupation' 
              onChange={this.handleChange}
              defaultValue={user.occupation}
            />
            <br />
            <TextField 
              name='city'
              variant='outlined'
              margin='dense'
              type='text'
              className={classes.signupTextField}
              placeholder='Enter Your City'
              label='City' 
              onChange={this.handleChange}
              defaultValue={user.city}
              error={errors.city ? true : false}
              helperText={errors.city}
            />
            <br />
            <TextField 
              name='bio'
              variant='outlined'
              margin='dense'
              type='text'
              className={classes.signupTextField}
              placeholder='Enter Your Bio'
              multiline
              rows="3"
              label='Bio' 
              onChange={this.handleChange}
              defaultValue={user.bio}
            />
            <br />
            {errors && (
              Object.values(errors).map((error, i) => <Typography key={i} variant='h2' className={classes.formError}>{error}</Typography>)
            )}
            <Button 
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
              variant="contained"
              type='submit'
            >Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    // </div>

    )
  }
}

const styles = (theme) => ({
  ...theme,
  button: {
    margin: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 6
  },
  buttonProgress: { 
    position: 'absolute'
  },
  submit: {
    marginTop: 24
  }
})

const mapStateToProps = state => ({
  UI: state.UI,
})


export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(UpdateDetails))
