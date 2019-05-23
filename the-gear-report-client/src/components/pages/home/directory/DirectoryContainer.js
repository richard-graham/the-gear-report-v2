import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Globe from './Globe'
import GlobeNav from './GlobeNav'
//Mui
import Hidden from '@material-ui/core/Hidden' 
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
//Redux
import { connect } from 'react-redux'
import { updateUserLocation, updateUserCountry } from '../../../../redux/actions/userActions'


const styles = {
  root: {
    width: '100%',
  },
  nav: {
    display: 'flex',

  },
  tabs: {
    width: '100%'
  },
  tabContainer: {
    padding: 10,
    height: 340,
    overflowY: 'scroll'
  },
  navContainerSmall: {
    width: '100%',
    height: 350,
  },
  navCountainerLarge: {
    width: '100%',
    height: '100%',
  },
  paper: {
    height: '100%'
  }
}

export class DirectoryContainer extends Component {
  state = {
    value: 0
  }

  componentDidMount = () => {
    this.props.updateUserLocation()
    this.props.updateUserCountry()

  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, user } = this.props
    const { value } = this.state
    return (
      <Paper square className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Hidden smUp implementation="css">
              <Tabs
                centered
                value={this.state.value}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
              >
                <Tab label="Directory" />
                <Tab label="Map" />
              </Tabs>
              <Grid className={classes.tabContainer} item xs={12}>
                {value === 0 && <GlobeNav user={user}/>}
                {value === 1 && <Globe user={user}/>}
              </Grid>
            </Hidden> 
            <Hidden xsDown implementation='css'>
              <Grid container spacing={0} className={classes.navContainerSmall} >
                <Grid item align='center' xs={3}>
                  <GlobeNav user={user}/>
                </Grid>
                <Grid item xs={9}>
                  <Globe user={user} />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  updateUserLocation, 
  updateUserCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DirectoryContainer))
