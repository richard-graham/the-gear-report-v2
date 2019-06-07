import React, { Component } from 'react'
import DirectoryContainer from './directory/DirectoryContainer'
import RecentAlerts from './RecentAlerts'
import { connect } from 'react-redux'
import { getNode } from '../../../redux/actions/tcActions'
import { checkIfCrag } from '../../../util/functions'
//Mui
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  directory: {
    height: 500,
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      height: 400
    },
    
  },
  header: {
    fontSize: 35,
    padding: 20
  },
  subtitle1: {
    fontSize: 25,
    paddingBottom: 20
  },
  root: {
    height: '100%',
    width: '100%',
    padding: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing.unit * 6,
      paddingRight: theme.spacing.unit * 12,
    }
  },
})

export class home extends Component {
  state = {
    loadingLocation: false
  }

  componentWillReceiveProps = (nextProps) => {
    if(!nextProps.location.additionalInfo && !nextProps.location.loading){
      this.props.getNode(nextProps.location.id, this.props.country)
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant='h2' className={classes.header}>Welcome to the Gear Report</Typography>
            <Typography variant='h1' className={classes.subtitle1}>An attempt to catalog and share dangerous climbing gear with the community to make our sport safer</Typography>
          </Grid>
          <Grid item className={classes.directory} xs={12}>
            <DirectoryContainer />
          </Grid>
          <Grid item md={6} xs={12}>
            <RecentAlerts history={this.props.history} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.UI.location,
  country: state.UI.country
})

export default connect(mapStateToProps, { getNode })(withStyles(styles)(home))
