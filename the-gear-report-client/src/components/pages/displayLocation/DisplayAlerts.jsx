import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs'
import { withRouter } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import Collapse from '@material-ui/core/Collapse'
import GridList from '@material-ui/core/GridList'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export class CardList extends Component {

  state = {}

  handleClick = (id) => {
    this.props.history.push(`/alert/${id}`)
  }

  handleExpandClick = (key) => {
    this.state[key] ? 
    this.setState({ [key]: !this.state[key] }) :
    this.setState({ [key]: true })
  }

  render(){
    const { alerts, classes } = this.props
  
    return (
      <Fragment>
        {alerts.length > 0 ? 
        <Typography variant='h6' >Alerts</Typography> : 
        <Typography variant='h6' >No active alerts for this area</Typography> }
        <br />
        <div className={classes.gridRoot}>
          <GridList className={classes.gridList} style={{ margin: 0 }}>
            {alerts.map((alert, i) => {
              const { userAvatarLetters, title, createdAt, images, body } = alert
              return (
                <div className={classes.myCard} style={{ padding: 0}} key={`a${i}`}>
                  <div className={classes.header}>
                    <div className={classes.myAvatarContainer}>
                      <Avatar aria-label='User' className={classes.myAvatar}>
                        {userAvatarLetters}
                      </Avatar>
                    </div>
                    <div className={classes.myCardHeaderContent}>
                      <span className={classes.myCardTitle} onClick={() => this.handleClick(alert.alertId)}>
                        {title}
                      </span>
                      <Typography variant='body2' className={classes.myCardDate} >
                        {dayjs(createdAt).format('DD-MM-YYYY')}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.myCardImageContainer}>
                    <img 
                      onClick={() => this.handleClick(alert.alertId)}
                      src={images[0]}
                      className={classes.myCardImage}
                      alt='alert'
                    />
                  </div>
                  <div className={classes.myCardActionBar}>
                    <IconButton aria-label="Like Alert">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state[`a${i}`],
                      })}
                      onClick={() => {this.handleExpandClick(`a${i}`)}}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                  <Collapse in={this.state[[`a${i}`]]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph style={{ textAlign: 'left' }}>Description:</Typography>
                      <Typography paragraph style={{ textAlign: 'left' }}>{body}</Typography>
                    </CardContent>
                  </Collapse>
                </div>
              )
            })}
          </GridList>
          </div>
      </Fragment>
    )
  }
}

const styles = theme => ({
  ...theme,
  avatar: {
    backgroundColor: red[500],
  },
  myCard: {
    maxWidth: 392,
    minWidth: 392,
    minHeight: 428,
    margin: 0.5,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fff',
    display: 'block',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    padding: 0,
    marginRight: 1.5
  },
  header: {
    display: 'flex',
    padding: 16,
    alignItems: 'center'
  },
  myAvatar: {
    backgroundColor: red[500],
  },
  myAvatarContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginRight: 16
  },
  myCardHeaderContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    display: 'block'
  },
  myCardTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    'fontFamily': '"Roboto", "Helvetica", "Ariel", sans-serif'
  },
  myCardDate: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  myCardImageContainer: {
    width: 400,
    height: 300,
    overflow: 'hidden'
  },
  myCardImage: {
    width: '100%',
    height: 'auto',
    marginTop: 'calc((-100% + 400px))'
  },
  myCardActionBar: {
    display: 'flex',
    padding: 8
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '73vw',
    // margin: 0,
    [theme.breakpoints.down('md')]: {
      width: '65vw'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90vw'
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: 1300,

  },
})

export default withRouter(withStyles(styles)(CardList))
