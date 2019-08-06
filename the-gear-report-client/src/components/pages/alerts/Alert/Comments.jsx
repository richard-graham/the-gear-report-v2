import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likeComment, unlikeComment } from '../../../../redux/actions/userActions'
import { submitComment, deleteComment } from '../../../../redux/actions/alertActions'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ProfilePic from '../../../../util/ProfilePic'
import classNames from 'classnames'
//Mui
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//Mui Icons
import Clear from '@material-ui/icons/Clear'
import Favorite from '@material-ui/icons/Favorite'

export class Comments extends Component {
  state = {
    comment: ''
  }

  handleCancel = () => {
    this.setState({ comment: '' })
  }

  handleCommentChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    })
  }

  handleCommentLike = id => {
    this.props.user.authenticated ? 
    this.props.likeComment(id) : 
    this.props.history.push('/login')
  }
  handleCommentUnlike = id => {
    this.props.unlikeComment(id)
  }

  handleCommentSubmit = () => {
    this.props.submitComment(this.props.alert.alertId, {body: this.state.comment})
    this.setState({ comment: '' })
  }

  handleDelComment = (id) => {
    this.props.deleteComment(id)
  }

  handleMouseEnter = key => {
    this.setState({ [key]: true })
  }

  handleMouseLeave = key => {
    this.setState({ [key]: false })
  }

  render() {
    const { 
      classes, 
      alert: {
        comments,
        commentCount,
      },
      likes,
      user
    } = this.props

    return(
      <Grid item container xs={12}>
        <Grid item lg={1} md={false} />
        <Grid item sm={10} xs={12} styles={{ textAlign: 'left'}}>


          <Divider style={{ marginTop: 20 }} variant='middle' />
          <div className={classes.commentHeader}>
            <Typography>{`${commentCount ? commentCount : 0} Comments`}</Typography>
          </div>
          <form className={classes.userComment}>
            <ProfilePic size={40} />
            <TextField
              className={classes.commentInputRoot}                    
              placeholder='Add a comment...'
              name='comment'
              value={this.state.comment}
              onChange={this.handleCommentChange}
            />
            <Button
              color='default'
              size='small'
              variant='text'
              className={classes.commentButton}
              onClick={this.handleCancel}
            >
            Cancel
            </Button>
            <Button
              disabled={!this.state.comment}
              color='primary'
              size='small'
              variant='contained'
              className={classes.commentButton}
              onClick={this.handleCommentSubmit}
              type='submit'
            >
            Comment
            </Button>
          </form>


          
          {comments && comments.map((comment, index) => {
            const { body, createdAt, userImage, userHandle, id, likeCount } = comment
            var liked = false
            const key = `comment${index}open`
            likes.forEach(like => {
              if(like.commentId === id) liked = true
            })
            return (
              <div className={classes.commentContainer} key={index}> 
                <Link to={`/profile/${userHandle}`}>
                  <img 
                    alt='words' 
                    src={userImage} 
                    className={classes.userImage}
                  />
                </Link>
                <div className={classes.comment}>
                  <div className={classes.userData}>
                    {user && user.credentials.handle && userHandle === user.credentials.handle &&
                      <Tooltip title='Delete Comment' placement='right' >
                        <IconButton 
                          onClick={() => this.handleDelComment(comment.id)} 
                          className={classes.deleteCommentButton}
                        >
                          <Clear /> 
                        </IconButton>
                      </Tooltip>
                    }
                    <Typography 
                      variant='body1' 
                      component={Link} 
                      to={`/profile/${userHandle}`} 
                      color='textPrimary'
                      className={classes.commentUserName}
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {moment(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                  </div>
                  <Typography variant='body1' className={classes.commentText}>
                    {body}
                  </Typography>
                  <div className={classes.likeContainer} >
                    {liked ? <Favorite 
                            className={classNames(classes.likedIcon, {
                              [classes.likeIcon]: this.state[key] === true,
                              [classes.likedIcon]: this.state[key] === false
                            })}
                            onClick={() => this.handleCommentUnlike(id)}
                            onMouseEnter={() => this.handleMouseEnter(key)}
                            onMouseLeave={() => this.handleMouseLeave(key)}
                            />  
                          : <Favorite 
                              className={classNames(classes.likeIcon, {
                              [classes.likeIcon]: this.state[key] === false,
                              [classes.likedIcon]: this.state[key] === true
                              })}
                              onMouseEnter={() => this.handleMouseEnter(key)}
                              onMouseLeave={() => this.handleMouseLeave(key)}
                              onClick={() => this.handleCommentLike(id)}
                              />}
                    <Typography className={classes.likeCount}>{likeCount}</Typography>
                  </div>
                </div>
              </div>
            )
          })}
        </Grid>  
        <Grid item md={false} /> 
      </Grid>             
    )
  }
}

const styles = theme => ({
  ...theme,
  commentHeader: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20
  },
  commentContainer: {
    paddingTop: 10,
    display: 'flex',
    width: '100%'
  },
  commentData: {
    marginLeft: 20
  },
  commentInputRoot: {
    margin: 0,
    marginLeft: 20,
    width: '70%'
  },
  userComment: {
    display: 'flex',
    marginBottom: 20
  },
  commentButton: {
    marginLeft: 10
  },
  commentText: {
    textAlign: 'left',
    overflowWrap: 'break-word',
    marginTop: 4
  },
  comment: {
    textAlign: 'left',
    width: '100%'
  },
  commentUserName: {
    textDecoration: 'none',
    textAlign: 'left'
  },
  likeComment: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  likeContainer: {
    display: 'flex',
    marginTop: 4
  },
  likeIcon: {
    color: 'lightGray'
  },
  likedIcon: {
    color: '#F50057'
  },
  likeCount: {
    lineHeight: 1.65,
    marginLeft: 5,
    fontSize: '1rem',
  },
  deleteCommentButton: {
    float: 'right'
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 15
  },

})

const mapStateToProps = state => ({
  likes: state.user.likes,
  user: state.user,
  alert: state.data.alert,
})

const mapDispatchToProps = {
  submitComment,
  likeComment,
  unlikeComment,
  deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Comments))
