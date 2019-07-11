import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateAlert from './dialogs/CreateAlert'
import CreateEvent from './dialogs/CreateEvent'
//Mui
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Warning from '@material-ui/icons/WarningTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/EventAvailable'

const styles = theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  [theme.breakpoints.down('sm')]: {
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
  },
});

class ActionButton extends React.Component {
  state = {
    open: false,
    hidden: false,
    createAlertOpen: false,
    createEventOpen: false
  }

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      })
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openCreateAlert = () => {
    this.setState({
      createAlertOpen: true,
    })
   }

   openCreateEvent = () => {
    this.setState({
      createEventOpen: true,
    })
   }

   closeAllDialogs = () => {
     this.setState({
      createAlertOpen: false,
      createEventOpen: false
     })
   }

  render() {
    const { classes, location: { pathname } } = this.props;
    const { hidden, open } = this.state;

    const actions = [
      { icon: <Warning />, name: 'Create Alert', handleClick: this.openCreateAlert },
      { icon: <EventIcon />, name: 'Create Event', handleClick: this.openCreateEvent },
    ];
    const shouldRender = pathname !== '/alerts' ? true : false

    return shouldRender ? (
      <Fragment>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onClick={this.handleOpen}
            onClose={this.handleClose}
            onMouseEnter={this.handleOpen}
            onMouseLeave={this.handleClose}
            open={open}
          >
            {actions.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.handleClick}
              />
            ))}
          </SpeedDial>
        <CreateAlert
          open={this.state.createAlertOpen} 
          closeAllDialogs={this.closeAllDialogs}
        />
        <CreateEvent
          open={this.state.createEventOpen} 
          closeAllDialogs={this.closeAllDialogs}
        />
      </Fragment>
    ) : ''
  }
}

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionButton);