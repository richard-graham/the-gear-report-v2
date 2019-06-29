import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAlert, submitComment } from '../../../redux/actions/dataActions'
import { likeComment, unlikeComment } from '../../../redux/actions/userActions'
import dayjs from 'dayjs'
import AlertImageGallery from './AlertImageGallery'
import { Link } from 'react-router-dom'
import ProfilePic from '../../../util/ProfilePic'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
//Icons
import Favorite from '@material-ui/icons/FavoriteBorderOutlined'
import Favorited from '@material-ui/icons/Favorite'

export class Alert extends Component {

  state = {
    comment: ''
  }

  componentDidMount = () => {
    this.props.getAlert(this.props.match.params.alertId)
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
        commentCount
      },
      loading,
      likes
    } = this.props
    return (
      <Paper className={classes.paper}>
          {loading ? <CircularProgress size={70} className={classes.progress} /> : (
            <Grid container spacing={8}>
              <Grid item xs={12} className={classes.headerGrid}>
                <Typography variant='body1' className={classes.alertHeader}>{title}</Typography>
              </Grid>
              <Grid item sm={7} xs={12}>
                <div className={classes.action}>
                  <Typography>Details</Typography>
                  <Divider/>
                  <br />
                  {createdAt && 
                  <Typography className={classes.alertDate}>
                    {`Created At: ${dayjs(createdAt).format('DD-MM-YYYY')}`}
                  </Typography>}
                  <Typography>{`Status: ${resolved ? 'Resolved' : 'Not Resolved'}`}</Typography>
                  <Typography>{`Sponsored: ${sponsored ? 'True' : 'False'}`}</Typography>
                  <Typography>{`Created By: ${userHandle}`}</Typography>
                  <br />
                  <Typography >{`Description: ${body}`}</Typography>
                  <Typography >{title}</Typography>
                </div>
              </Grid>
              <Grid item lg={4} md={5} sm={5} xs ={10} >
                <Paper>
                  <AlertImageGallery images={images} />
                </Paper>
              </Grid>

               {/* // Comments */}
              <Grid item container xs={12}>
                <Grid item lg={1} md={false} />
                <Grid item sm={10} xs={12} styles={{ textAlign: 'left'}}>

              
                  <Divider style={{ marginTop: 20 }} variant='middle' />
                  <div className={classes.commentHeader}>
                    <Typography>{`${commentCount ? commentCount : 0} Comments`}</Typography>
                  </div>
                  <div className={classes.userComment}>
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
                    >
                    Comment
                    </Button>
                  </div>
                  <div>

                  
                  {comments && comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle, id } = comment
                    var liked = false
                    likes.forEach(like => {
                      if(like.commentId === id) liked = true
                    })
                    return (
                      <div className={classes.commentContainer} key={index}> 
                        <img alt='words' src={userImage} className={classes.userImage} />
                        <div className={classes.comment}>
                          <div className={classes.userData}>
                            <Typography 
                              variant='body1' 
                              component={Link} 
                              to={`/profile/${userHandle}`} 
                              color='primary'
                              className={classes.commentUserName}
                            >
                              {userHandle}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                            </Typography>
                          </div>
                          <Typography variant='body1' className={classes.commentText}>
                            {body}
                          </Typography>
                          { liked ? <Favorited 
                                      className={classes.likeComment} 
                                      onClick={() => this.handleCommentUnlike(id)}
                                      color='secondary' />  
                                  : <Favorite 
                                      className={classes.likeComment} 
                                      // onMouseOver={change class}
                                      onClick={() => this.handleCommentLike(id)}
                                      />}
                        </div>
                      </div>
                    )
                  })}
                  </div>

                </Grid>  
                <Grid item md={false} /> 
              </Grid>           
            </Grid>
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
      margin: 0,
      marginBottom: 20
    },
    textAlign: 'left'
  },
  alertHeader: {
    float: 'left',
    fontSize: 27,
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      marginLeft: 0
    },
    marginLeft: 20
  },
  headerGrid: {
    marginBottom: '10px'
  },
  alertDate: {
    fontSize: 15,
  },
  paper: {
    width: '100%',
    minHeight: '100vh',
    padding: 50,
    flexGrow: 1,
  },
  userImage: {
    height: 40,
    borderRadius: '50%',
    marginRight: 15
  },
  progress: {
    marginTop: '30%'
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
    overflowWrap: 'break-word'
  },
  comment: {
    textAlign: 'left'
  },
  commentUserName: {
    textDecoration: 'none',
    textAlign: 'left'
  },
  likeComment: {
    width: 18,
    height: 18
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
  unlikeComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Alert))
