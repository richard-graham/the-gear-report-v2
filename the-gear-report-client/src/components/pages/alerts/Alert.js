import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAlert, submitComment, deleteComment } from '../../../redux/actions/dataActions'
import { likeComment, unlikeComment } from '../../../redux/actions/userActions'
import moment from 'moment'
import AlertImageGallery from './AlertImageGallery'
import { Link } from 'react-router-dom'
import ProfilePic from '../../../util/ProfilePic'
import classNames from 'classnames'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs'
//Icons
import Favorite from '@material-ui/icons/Favorite'
import Clear from '@material-ui/icons/Clear'

export class Alert extends Component {

  state = {
    comment: ''
  }

  componentDidMount = () => {
    this.props.getAlert(this.props.match.params.alertId)
    window.scrollTo(0, 0)
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
    this.props.likeComment(id)
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
        title,
        createdAt,
        body,
        sponsored,
        images,
        resolved,
        userHandle,
        comments,
        commentCount,
        locations,
        locationNames
      },
      loading,
      likes
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
                    <div>

                    
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
                              <IconButton 
                                onClick={() => this.handleDelComment(comment.id)} 
                                className={classes.deleteCommentButton}
                              >
                                <Clear /> 
                              </IconButton>
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
                    </div>

                  </Grid>  
                  <Grid item md={false} /> 
                </Grid>           
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
  userImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 15
  },
  progress: {
    position: 'absolute',
    top: '50%'
  },
  content: {
    marginTop: 20,
    textAlign: 'left'
  },
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
  breadcrumbRoot: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 30
  },
  createdByLink: {
    color: 'inherit',
  },
  deleteCommentButton: {
    float: 'right'
  }
})

const mapStateToProps = (state) => ({
  alert: state.data.alert,
  loading: state.UI.loading,
  likes: state.user.likes
})

const mapDispatchToProps = {
  submitComment,
  getAlert,
  likeComment,
  unlikeComment,
  deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Alert))
