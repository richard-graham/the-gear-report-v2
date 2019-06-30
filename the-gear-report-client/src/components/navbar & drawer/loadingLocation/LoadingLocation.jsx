import React, { Component } from 'react'
import { connect } from 'react-redux'
//Mui
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles'

export class LoadingLocation extends Component {

  state = {
    completed: 0
  }

  componentDidMount = () => {
    this.timer = setInterval(this.progress, 70);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
    this.setState({ completed: 0 })
  }

  progress = () => {
    const { completed } = this.state;
    const diff = Math.random() * 10;
    if(this.props.loading && this.state.completed < 95){ 
      this.setState({ completed: Math.min(completed + diff, 100) })
    } else if (!this.props.loading ) {
      this.setState({ completed: 0 })
    }
  };

  render() {
    const { classes, loading } = this.props;
    return loading ? (
      <LinearProgress 
        color="secondary" 
        variant="determinate" 
        value={this.state.completed} 
        className={classes.progress}
      />
    ) : ''
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  progress: {
    width: '100%',
    height: 2
  }
}

const mapStateToProps = (state) => ({
  loading: state.UI.location.loading
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadingLocation))
