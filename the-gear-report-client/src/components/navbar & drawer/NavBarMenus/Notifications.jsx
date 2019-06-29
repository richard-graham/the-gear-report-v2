import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'

export class Notifications extends Component {

  state = {}

  getNoteType = (type) => {
    switch(type){
      case 'commentLike':
        return 'liked your comment'
      case 'alertLike':
        return 'liked your alert'
      case 'comment':
        return 'commented on your alert'
      default:
        return 'did something'
    }
  }

  handleItemEnter = key => {
    this.setState({ [key]: true })
  }

  handleItemLeave = key => {
    this.setState({ [key]: false })
  }

  render() {
    const {
      anchorEl,
      handleMenuClose,
      classes,
      notifications,
      noteIds
    } = this.props
    return notifications.length > 0 ? (
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(noteIds)}
        style={{ padding: 0 }}
      >
       <div className={classes.menuList}>
         {notifications.map((note, i) => {
           const { sender, createdAt, alertId, type, read } = note
           return !read ? (
            <Link 
              to={`/alert/${alertId}`} 
              style={{ textDecoration: 'none' }} 
              key={i} >
              <div 
                className={classNames(classes.menuItem, {
                  [classes.menuItemHover]: this.state[i] === true
                })}
                onMouseEnter={() => this.handleItemEnter(i)}
                onMouseLeave={() => this.handleItemLeave(i)}
                >
                <p className={classes.noteText}>{`${sender} ${this.getNoteType(type)}`}</p>
                <p className={classes.noteTime}>{`${moment(createdAt).fromNow('h:mm a, MMMM DD YYYY')} ago`}</p>
              </div>
              <Divider variant='fullWidth' light={true} />
            </Link> 
           ) : ''
         })}
       </div> 

      </Menu>
    ) : ''
  }
}

const styles = {
  menu: {

  },
  menuList: {
    outline: 'none',
  },
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12
  },
  menuItemHover: {
    backgroundColor: '#bdbdbd9e'
  },
  noteText: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: '1rem',
    color: '#000000de',
    margin: 0
  },
  noteTime: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: '0.875rem',
    color: '#0000008a',
    margin: 0
  }
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

export default connect(mapStateToProps)(withStyles(styles)(Notifications))
