import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip'
import Green from '@material-ui/core/colors/green'
import Avatar from '@material-ui/core/Avatar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
//Mui Icons
import AttachMoney from '@material-ui/icons/AttachMoneyOutlined'
import { Typography } from '@material-ui/core';


export class WorkPlan extends Component {

  state = {
    pledged: 0
  };

  handleChange = (event, pledged) => {
    this.setState({ pledged });
  };

  isExpired = assignment => {
    return !moment(assignment.completionDate).add('2', 'd').isAfter(new Date())
  }

  render() {
    const { assignments, classes } = this.props
    const { pledged } = this.state;
    const defaultPic = "https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media"


    return (
      <Fragment>
        {assignments.map((assignment, i) => {
          console.log(assignment);
          const { userImage, userHandle, allowSponsors, completed, completionDate, estimatedCost, plan, totalPledged, userAvatarLetters } = assignment
          return (
              <ExpansionPanel key={i}>
                <ExpansionPanelSummary className={classes.header}>
                    <div className={classes.myAvatarContainer}>
                      <Link to={`/profile/${userHandle}`} style={{ textDecoration: 'none' }}>
                        {userImage === defaultPic ? (
                        <Avatar aria-label='User' className={classes.myAvatar}>
                          {userAvatarLetters}
                        </Avatar>
                        ) : (
                          <img src={userImage} className={classes.userImage} alt='user' />
                        )}
                      </Link>
                    </div>
                    <div className={classes.myCardHeaderContent}>
                        <span className={classes.myCardTitle} >
                          Completion Date
                        </span>
                      <Typography variant='body2' className={classes.myCardDate} >
                        {moment(completionDate).format('Do MMMM YYYY')}
                      </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <div className={classes.contentContainer} >
                  <div className={classes.content}>
                    <Typography 
                      variant={'body2'}
                      className={classes.plan}
                    >"{plan}"</Typography>
                    <Typography variant='subtitle2'>
                      <Link 
                        to={`/profile/${userHandle}`} 
                        style={{ textDecoration: 'none', color: '#212121'}}
                      >-{userHandle}</Link>
                    </Typography>
                    <div className={classes.pledgeContainer}> 
                      <div className={classes.calculationContainer}>
                      <Typography variant='h6'>Pledge</Typography>
                        <div className={classes.calculation}>
                          <Typography>Estimated Cost:</Typography>
                          <Typography variant='h6'>${estimatedCost}</Typography>
                        </div>
                        <div className={classes.calculation}>
                          <Typography>Total Pledged:</Typography>
                          <Typography variant='h6'>${totalPledged + pledged}</Typography>
                        </div>
                        <div className={classes.calculation}>
                          <Typography>Your Contribution:</Typography>
                          <Typography variant='h6'>${pledged}</Typography>
                        </div>
          
                        <Slider
                          value={pledged}
                          aria-labelledby="slider-image"
                          onChange={this.handleChange}
                          min={0}
                          max={Number(estimatedCost)}
                          step={5}
                          classes={{
                            container: classes.slider,
                            thumbIconWrapper: classes.thumbIconWrapper,
                          }}
                          thumb={
                            <Tooltip 
                              title={pledged} 
                              className={classes.tooltip}
                              interactive
                              leaveDelay={24}
                            >
                              <AttachMoney style={{ color: Green[500], height: 36, width: 36, borderRadius: '50%' }} />
                            </Tooltip>}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Button
                            color='primary'
                            variant='raised'
                            size='small'
                            className={classes.submitButton}
                          >Submit Pledge</Button>
                          <Typography style={{ textAlign: 'center' }}>New to pledging? Learn more <Link to='/'>here</Link>.</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>
          )
        })}
      </Fragment>
    )
  }
}

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    height: 36,
    width: 36
  },
  tooltip: {
    backgroundColor: '#fff',
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: '50%',
    marginRight: 15,
  },
  plan: {
    marginTop: 5
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10
  },
  content: {
    marginLeft: 13,
    marginRight: 13
  },
  pledgeContainer: {
    marginTop: 20,
    minWidth: '100%',
    height: '100%',
  },
  myAvatarContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginRight: 16
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Green[100]
  },
  userImage: {
    height: 37,
    width: 37,
    borderRadius: '50%'
  },
  myCardHeaderContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    
  },
  myCardTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    'fontFamily': '"Roboto", "Helvetica", "Ariel", sans-serif'
  },
  myCardDate: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  calculationContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '50%'
  },
  calculation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  submitButton: {
    marginTop: 15,
    maxWidth: 'fit-content',
    alignSelf: 'center',
    marginBottom: 15
  }
};

export default withStyles(styles)(WorkPlan)
