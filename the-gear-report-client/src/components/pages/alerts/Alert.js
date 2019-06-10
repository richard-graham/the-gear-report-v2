import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAlert } from '../../../redux/actions/dataActions'
import dayjs from 'dayjs'
import AlertImageGallery from './AlertImageGallery'
import { Link } from 'react-router-dom'
import ProfilePic from '../../../util/ProfilePic'
import { submitComment } from '../../../redux/actions/dataActions'
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
      loading
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
              <Grid item md={5} xs ={12} >
                <Paper>
                  <AlertImageGallery images={images} />
                </Paper>
              </Grid>
              <Grid item md={9} xs={12} styles={{ textAlign: 'left'}}>
                <Divider variant='middle' />
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
                  const { body, createdAt, userImage, userHandle } = comment
                  return (
                      <Grid item sm={12}>
                        <Grid container className={classes.commentContainer}>
                          <Grid item sm={1}>
                            <img alt='words' src={userImage} className={classes.userImage} />
                          </Grid>
                          <Grid item sm={11}>
                            <div className={classes.commentData}>
                              <div className={classes.userData}>
                                <Typography 
                                  variant='h5' 
                                  component={Link} 
                                  to={`/users/${userHandle}`} 
                                  color='primary'
                                  inputProps={{ padding: 0 }}
                                >
                                  {userHandle}
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                  {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                              </div>
                              <Typography variant='body1'>
                                {body}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                  )
                })}
                </div>

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
    textAlign: 'left'
  },
  alertHeader: {
    float: 'left',
    fontSize: 27,
    marginBottom: 20,
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
    width: 50,
    borderRadius: '50%'
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
    margin: 20
  },
  commentContainer: {
    padding: 30
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

  },
  userData: {
    float: 'left',
    marginRight: 10,
    height: 8
  },
  commentButton: {
    marginLeft: 10
  }
})

const mapStateToProps = (state) => ({
  alert: state.data.alert,
  loading: state.UI.loading
})

const mapDispatchToProps = {
  submitComment,
  getAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Alert))
