import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs'
//Mui
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import Collapse from '@material-ui/core/Collapse'
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export class CardList extends Component {

  state = {}

  handleExpandClick = (key) => {
    this.state[key] ? 
    this.setState({ [key]: !this.state[key] }) :
    this.setState({ [key]: true })
  }

  render(){
    const { alerts, classes } = this.props
  
    return (
      <Fragment>
        <Typography variant='h6' >Alerts</Typography>
          
          {alerts.map((alert, i) => {
            const { userAvatarLetters, title, createdAt, images, body } = alert
            return (
              <div className={classes.myCard} key={`a${i}`}>
                <div className={classes.header}>
                  <div className={classes.myAvatarContainer}>
                    <Avatar aria-label='User' className={classes.myAvatar}>
                      {userAvatarLetters}
                    </Avatar>
                  </div>
                  <div className={classes.myCardHeaderContent}>
                    <span className={classes.myCardTitle}>
                      {title}
                    </span>
                    <Typography variant='body2' className={classes.myCardDate} >
                      {dayjs(createdAt).format('DD-MM-YYYY')}
                    </Typography>
                  </div>
                </div>
                <div className={classes.myCardImageContainer}>
                  <img 
                    src={images[0]}
                    className={classes.myCardImage}
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
          
      </Fragment>
    )
  }
}

const styles = theme => ({
  ...theme,
  card: {
    maxWidth: 400,
  },
  media: {
    maxHeight: 300
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  myCard: {
    maxWidth: 400,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fff',
    display: 'block',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
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
})

export default withStyles(styles)(CardList)
