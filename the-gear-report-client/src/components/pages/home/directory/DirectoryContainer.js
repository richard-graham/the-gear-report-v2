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
    height: 350,
    overflowY: 'scroll'
  },
  navContainer: {
    width: '100%',
    height: 350,
  }
}

export class DirectoryContainer extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props
    const { value } = this.state
    return (
      <Paper square>
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
                {value === 0 && <GlobeNav />}
                {value === 1 && <Globe />}
              </Grid>
            </Hidden> 
            <Hidden xsDown implementation='css'>
              <Grid container spacing={0} className={classes.navContainer} >
                <Grid item align='center' xs={3}>
                  <GlobeNav />
                </Grid>
                <Grid item xs={9}>
                  <Globe />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(DirectoryContainer)
