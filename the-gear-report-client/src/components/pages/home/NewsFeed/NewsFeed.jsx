import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getFirstNewsFeed, getAdditionalNewsFeed } from '../../../../redux/actions/newsFeedActions'
//Mui
import withStyles from '@material-ui/core/styles/withStyles'


export class NewsFeed extends Component {

  componentDidMount = () => {
    this.props.getFirstNewsFeed()
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.newsFeedContainer}>
        
      </div>
    )
  }
}

const styles = {
 
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  getFirstNewsFeed,
  getAdditionalNewsFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewsFeed))
