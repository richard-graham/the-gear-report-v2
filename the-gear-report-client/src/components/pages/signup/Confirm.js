import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

export class FormPersonalDetails extends Component {

  continue = e => {
    e.preventDefault()
    // Process Form
    this.props.nextStep()
  }

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    const { values: { firstName, lastName, email, occupation, city, bio }, classes } = this.props

    return (
      <Fragment>
        <List>
          <ListItemText 
            primary='First Name'
            secondary={ firstName }
          />
          <ListItemText 
            primary='Last Name'
            secondary={ lastName }
          />
          <ListItemText 
            primary='Email'
            secondary={ email }
          />
          <ListItemText 
            primary='Occupation'
            secondary={ occupation }
          />
          <ListItemText 
            primary='City'
            secondary={ city }
          />
          <ListItemText 
            primary='Bio'
            secondary={ bio }
          />
        </List>
        <br />
        <Button 
          color='secondary'
          className={classes.button}
          onClick={this.back}
          variant="contained"
        >Back</Button>
        <Button 
          color='primary'
          className={classes.button}
          onClick={this.continue}
          variant="contained"
        >Submit</Button>
      </Fragment>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default withStyles(styles)(FormPersonalDetails)
