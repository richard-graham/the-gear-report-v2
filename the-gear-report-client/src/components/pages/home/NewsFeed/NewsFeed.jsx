import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFirstNewsFeed, getAdditionalNewsFeed } from '../../../../redux/actions/newsFeedActions'
import NewAlert from './components/NewAlert'
import NewComment from './components/NewComment'
import NewWorkPlan  from './components/NewWorkPlan'
import WorkPlanStatus  from './components/WorkPlanStatus'
//Mui
import withStyles from '@material-ui/core/styles/withStyles'


export class NewsFeed extends Component {

  componentDidMount = () => {
    this.props.getFirstNewsFeed()
  }

  feedItem = (item) => {
    switch(item.type){
      case 'newAlert':
        return <NewAlert props={item} />
      case 'newComment':
        return <NewComment props={item} />
      case 'newWorkPlan':
        return <NewWorkPlan props={item} />
      case 'completedWorkPlan':
        return <WorkPlanStatus props={item} />
      case 'unCompletedWorkPlan':
        return <WorkPlanStatus props={item} />
    }
  }

  render() {

    const { classes, newsFeed, loadingNewsFeed } = this.props

    return (
      <div className={classes.newsFeedContainer}>
        {newsFeed.map(feedBlock => {
          console.log(feedBlock);
          feedBlock.forEach(item => this.feedItem(item))
          // If loading spin stuff
        })}
      </div>
    )
  }
}

const styles = {
  newsFeedContainer: {

  }
}

const mapStateToProps = state => ({
  newsFeed: state.data.newsFeed.items,
  loadingNewsFeed: state.data.newsFeed.loading
})

const mapDispatchToProps = {
  getFirstNewsFeed,
  getAdditionalNewsFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewsFeed))
