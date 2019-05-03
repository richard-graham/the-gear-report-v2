import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Warning from '@material-ui/icons/WarningTwoTone';
import EditOutlined from '@material-ui/icons/EditOutlined';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/EventAvailable'


const styles = theme => ({
  root: {
    height: 380
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
});

class ActionButton extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

   createAlert = () => {
     console.log('createAlert');
   }

   editAlert = () => {
    console.log('editAlert');
  }

  createEvent = () => {
    console.log('createEvent');
  }

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    const actions = [
      { icon: <Warning />, name: 'Create Alert', handleClick: this.createAlert },
      { icon: <EditOutlined />, name: 'Edit Alert', handleClick: this.editAlert },
      { icon: <EventIcon />, name: 'Create Event', handleClick: this.createEvent },
    ];

    return (
      <div className={classes.root}>
        <span style={{ color: 'red' }}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onBlur={this.handleClose}
            onClick={this.handleClick}
            onClose={this.handleClose}
            onFocus={this.handleOpen}
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
        </span>
      </div>
    );
  }
}

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionButton);