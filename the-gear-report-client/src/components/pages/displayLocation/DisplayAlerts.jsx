import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import GridList from '@material-ui/core/GridList'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Search from '@material-ui/icons/Search'


export class CardList extends Component {

  state = {}

  handleExpandClick = (key) => {
    this.state[key] ? 
    this.setState({ [key]: !this.state[key] }) :
    this.setState({ [key]: true })
  }

  render(){
    const { alerts, classes } = this.props
    const defaultPic = "https://firebasestorage.googleapis.com/v0/b/the-gear-report-a2ce8.appspot.com/o/no-image.png?alt=media"
  
    return (
      <Fragment>
        {alerts.length > 0 ? 
        <Typography variant='h6' >Alerts</Typography> : 
        <Typography variant='h6' >No active alerts for this area</Typography> }
        <br />
        <div className={classes.gridRoot}>
          <GridList className={classes.gridList} style={{ margin: 0 }}>
            {alerts.map((alert, i) => {
              const { userAvatarLetters, title, createdAt, images } = alert
              return (
                <div className={classes.myCard} style={{ padding: 0}} key={`a${i}`}>
                  <div className={classes.header}>
                    <div className={classes.myAvatarContainer}>
                      <Link to={`/user/${alert.userHandle}`} style={{ textDecoration: 'none' }}>
                        {alert.userImage === defaultPic ? (
                        <Avatar aria-label='User' className={classes.myAvatar}>
                          {userAvatarLetters}
                        </Avatar>
                        ) : (
                          <img src={alert.userImage} className={classes.userImage} alt='user' />
                        )}
                      </Link>
                    </div>
                    <div className={classes.myCardHeaderContent}>
                      <Link to={`/alert/${alert.alertId}`} style={{ textDecoration: 'none' }} >
                        <span className={classes.myCardTitle} >
                          {title}
                        </span>
                      </Link>
                      <Typography variant='body2' className={classes.myCardDate} >
                        {moment(createdAt).format('DD-MM-YYYY')}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.myCardImageContainer}>
                    <Link to={`/alert/${alert.alertId}`} >
                      <img 
                        src={images[0]}
                        className={classes.myCardImage}
                        alt='alert'
                      />
                    </Link>
                  </div>
                  <div className={classes.myCardActionBar}>
                    <IconButton aria-label="Like Alert">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                      <ShareIcon />
                    </IconButton>
                    <Link 
                      to={`/profile/${alert.userHandle}`} 
                      style={{ 
                        textDecoration: 'none', 
                        marginLeft: 'auto' 
                      }}>
                      <IconButton 
                        aria-label="Show more" 
                        >
                        <Search />
                      </IconButton>
                    </Link>
                  </div>
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
    marginBottom: 2,
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
    padding: 13,
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
  userImage: {
    height: 37,
    width: 37,
    borderRadius: '50%'
  }
})

export default withRouter(withStyles(styles)(CardList))
