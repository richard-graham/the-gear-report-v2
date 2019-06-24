import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation } from '../../../redux/actions/tcActions'
import { getAlertsByLocation } from '../../../redux/actions/dataActions'

import Beta from './Beta'
import ChildTable from './ChildTable'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export class DisplayCrag extends Component {

  componentDidMount = () => {
    // this.props.getAlertsByLocation(this.props.match.params.locationID)
  }

  componentDidUpdate = () => {
    const { location, match, country, loading } = this.props
    //if the location is the standard result go get the data for 
    if('parent' in country && location.id !== match.params.locationID && !loading) {
      this.props.updateSearchLocation(match.params.locationID, country)
      this.props.getAlertsByLocation(match.params.locationID)
    }
  }

  render() {
    const { 
      location: { 
        children, 
        subType, 
        beta, 
        name, 
        additionalInfo 
      }, 
      loadingAlerts,
      country, 
      alerts,
      classes 
    } = this.props

    return additionalInfo ? (
      <div className={classes.container}>
        <Typography
          gutterBottom
          variant={'h3'}
          className={classes.title}
        >{name}</Typography>

        <Grid container spacing={32}>
          <Grid item sm={12} xs={12}>
            {beta && <Beta locationBeta={beta} />}
          </Grid>
          <Grid item sm={12} xs={12}>
            {children && !loadingAlerts && 
              <div className={classes.tableDiv}>
                <ChildTable children={children} subType={subType} country={country} alerts={alerts} />
              </div>}
          </Grid>
        </Grid>
      </div>
    ) : (''
      //add spinner here
    )
  }
}

const styles = {
  container: {
    padding: 10
  },
  title: {
    padding: 10
  },
  tableDiv: {
    margin: 40,
    borderRadius: 5,
    backgroundColor: '#f4f4f4'
  }
}

const mapStateToProps = (state) => ({
  location: state.UI.location,
  country: state.UI.country,
  loading: state.UI.location.loading,
  loadingAlerts: state.UI.location.loadingAlerts,
  alerts: state.data.alerts
})

const mapDispatchToProps = {
  updateSearchLocation,
  getAlertsByLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayCrag))
