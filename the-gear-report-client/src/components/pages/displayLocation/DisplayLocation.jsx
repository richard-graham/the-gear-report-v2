import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation, getNode } from '../../../redux/actions/tcActions'
import { getAlertsByLocation } from '../../../redux/actions/dataActions'
import DisplayAlerts from './DisplayAlerts'
import Beta from './Beta'
import ChildTable from './ChildTable'
import LocationInfo from './locationInfo/LocationInfo'
import SubButton from './util/SubButton'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export class DisplayCrag extends Component {

  componentDidMount = () => {
    const { match} = this.props
    this.props.getNode(match.params.locationID)
    this.props.getAlertsByLocation(match.params.locationID)
  }

  componentDidUpdate = (prevProps) => {
    const { location, match, country, loading } = this.props
    //initial load case
    if(!loading && location.id === 11737723 && match.params.locationID !== '11737723') {
      this.props.updateSearchLocation(match.params.locationID, country)
      this.props.getAlertsByLocation(match.params.locationID)
      //new location case
    } else if(!loading && match.params.locationID !== prevProps.match.params.locationID){
      this.props.updateSearchLocation(match.params.locationID, country)
      this.props.getAlertsByLocation(match.params.locationID)
    }
  }

  hasUniqueBeta = beta => {
    let res = false
    beta.forEach(data => {if(!data.inheritedFrom) res = true })
    return res
  }

  render() {
    const { 
      location: { 
        children, 
        subType, 
        beta, 
        name, 
        additionalInfo,
      }, 
      location,
      loadingAlerts,
      country, 
      alerts,
      classes,
    } = this.props

    return additionalInfo ? (
      <div className={classes.container}>
        <Typography
          gutterBottom
          variant={'h3'}
          className={classes.locationName}
          >{name}</Typography>
        <Grid container spacing={32}>
          <Grid item xs={12} >
            <LocationInfo location={location} />
            <SubButton />
          </Grid>
          {beta && this.hasUniqueBeta(beta) && 
            <Beta locationBeta={beta} />}
          {alerts && !loadingAlerts &&
          <Grid item xs={12}>
            <DisplayAlerts alerts={alerts} />
          </Grid>}
          {children &&
          <Grid item sm={12} xs={12}>
              <div className={classes.tableDiv}>
                <ChildTable children={children} subType={subType} country={country} alerts={alerts} />
              </div>
          </Grid>}
        </Grid>
      </div>
    ) : (''
      //add spinner here
    )
  }
}

const styles = theme => ({
  ...theme,
  container: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
    [theme.breakpoints.down('md')]: {
      marginLeft: 40,
      marginRight: 40,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 20,
      marginRight: 20,
    },
  },
  tableDiv: {
    borderRadius: 5,
    backgroundColor: '#f4f4f4'
  },
  locationName: {
    marginTop: 20,
    marginBottom: 15
  }
})

const mapStateToProps = (state) => ({
  location: state.UI.location,
  country: state.UI.country,
  loading: state.UI.location.loading,
  loadingAlerts: state.UI.location.loadingAlerts,
  alerts: state.data.alerts
})

const mapDispatchToProps = {
  updateSearchLocation,
  getAlertsByLocation,
  getNode
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DisplayCrag))
