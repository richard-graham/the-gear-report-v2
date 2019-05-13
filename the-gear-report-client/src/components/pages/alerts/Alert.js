import React, { Component } from 'react'
//Mui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export class Alert extends Component {
  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='ProfileAvatar' className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          />
        <CardMedia 
          className={classes.media}
          image='https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.chimneyrockco.org%2Fwp-content%2Fuploads%2F2016%2F06%2F0166_resized-chmrk.jpg&f=1'
          title='rock'
        />
        <CardContent>
          <Typography component='p'>
            This is a rock, rad check it out
          </Typography>
        </CardContent>
        <CardActions  className={classes.action} disableActionSpacing>
          <IconButton aria-label='Add to favourites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='Share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

const styles = theme => ({
  card: {
    width: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },avatar: {
    backgroundColor: red[500],
  },
})

export default withStyles(styles)(Alert)
