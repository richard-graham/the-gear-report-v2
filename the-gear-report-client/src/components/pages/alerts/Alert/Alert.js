import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAlert } from '../../../../redux/actions/alertActions'
import { getAssignmentByAlert } from '../../../../redux/actions/assignmentActions'
import moment from 'moment'
import AlertImageGallery from '../AlertImageGallery'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import WorkPlanDialog from './WorkPlanDialog/WorkPlanDialog'
import WorkPlan from './WorkPlan/WorkPlan'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
//Icons

export class Alert extends Component {

  componentDidMount = () => {
    const { alertId } = this.props.match.params 
    this.props.getAlert(alertId)
    this.props.getAssignmentByAlert(alertId)
    window.scrollTo(0, 0)
  }

  currentAssignments = assignments => {
    let current = []
    assignments.forEach(assignment => {
      const { completed, completionDate } = assignment
      const notExpired = moment(completionDate).add('2', 'd').isAfter(new Date())
      if(completed === false && notExpired){
        current.push(assignment)
      }
    })
    return current
  }

  hasCompletedAssignment = assignments => {
    let res = false
    assignments.forEach(assignment => {
      if (assignment.completed === true){
        res = true
      }
    })
    return res
  }

  shouldRenderButton = (assignments) => {
    if(this.currentAssignments(assignments).length === 0 && !this.hasCompletedAssignment(assignments)) return true 
    else return false
  }


  render() {
    const { 
      classes, 
      alert: {
        title,
        createdAt,
        body,
        sponsored,
        images,
        resolved,
        userHandle,
        locations,
        locationNames,
        assignments,
        loadingAssignments
      },
      loading,
    } = this.props

    return (
      <Paper className={classes.paper}>
          {loading ? <CircularProgress size={70} className={classes.progress} /> : (
            <Fragment>
              {locationNames && 
              <div className={classes.breadcrumbRoot}>
                <Breadcrumbs style={{ textDecoration: 'none' }}>
                  {locationNames
                    .filter((location, i) => (i > 4))
                    .map((location, i) => {
                      return (
                          <Link
                            key={i} 
                            style={{ textDecoration: 'none' }}
                            to={`/location/${locations[i + 5]}`}
                            >
                            <Typography color='textSecondary' >{location}</Typography>
                          </Link>
                      )
                    })
                  }
                </Breadcrumbs>
              </div>}
              <Grid container spacing={8} style={{ marginLeft: 10 }}>
                <Grid item xs={12} className={classes.headerGrid}>
                  <Typography variant='body1' className={classes.alertHeader}>{title}</Typography>
                </Grid>
                <Grid item sm={7} xs={12}>
                  <div className={classes.action}>
                    <Typography>Details</Typography>
                    <Divider/>
                    <br />
                    {createdAt && 
                    <Typography>{`Created At: ${moment(createdAt).format('DD-MM-YYYY')}`}</Typography>}
                    <Typography>{`Status: ${resolved ? 'Resolved' : 'Not Resolved'}`}</Typography>
                    <Typography>{`Sponsored: ${sponsored ? 'True' : 'False'}`}</Typography>
                    <Typography>{`Created By: `}
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/profile/${userHandle}`}
                        className={classes.createdByLink}
                        >
                        {userHandle}
                      </Link>
                    </Typography>
                    
                    <br />
                    <Typography >{`Description: ${body}`}</Typography>
                    <br />
                    <Typography>Work Plan</Typography>
                    <Divider/>
                    <br />
                    {!loadingAssignments && 
                    this.shouldRenderButton(assignments) &&  
                    <Fragment>
                      <Typography>There are no current plans to fix this alert.</Typography>
                      <Typography>Planning on fixing this? Let others know and request sponsorship by creating a work plan</Typography>
                      <br />
                      <WorkPlanDialog />
                    </Fragment>}
                    {!loadingAssignments && assignments.length > 0 &&
                    <WorkPlan assignments={assignments} />}
                  </div>
                </Grid>
                <Grid item lg={4} md={5} sm={5} xs ={10} >
                  <div style={{ marginTop: 40 }}>
                    <Paper>
                      <AlertImageGallery images={images} />
                    </Paper>
                  </div>
                </Grid>

                {/* // Comments */}
                <Comments history={this.props.history} />
              </Grid>
            </Fragment>
          )}
      </Paper>
    )
  }
}

const styles = theme => ({
  ...theme,
  action: {
    margin: 20,
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
    textAlign: 'left'
  },
  alertHeader: {
    float: 'left',
    fontSize: 27,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      marginLeft: 0
    },
    marginLeft: 20
  },
  headerGrid: {
    marginBottom: '10px'
  },
  paper: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 50,
    flexGrow: 1,
  },
  progress: {
    position: 'absolute',
    top: '50%'
  },
  content: {
    marginTop: 20,
    textAlign: 'left'
  },
  breadcrumbRoot: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 30
  },
  createdByLink: {
    color: 'inherit',
  },
})

const mapStateToProps = (state) => ({
  alert: state.data.alert,
  loading: state.UI.loading,
  likes: state.user.likes,
  user: state.user.credentials,
})

const mapDispatchToProps = {
  getAlert,
  getAssignmentByAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Alert))
