import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFirstNewsFeed, getAdditionalNewsFeed } from '../../../../redux/actions/newsFeedActions'
import NewAlert from './components/NewAlert'
import NewComment from './components/NewComment'
import NewWorkPlan  from './components/NewWorkPlan'
import WorkPlanStatus  from './components/WorkPlanStatus'
//Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'


export class NewsFeed extends Component {

  componentDidMount = () => {
    this.props.getFirstNewsFeed()
  }

  feedItem = (item, index) => {
    switch(item.type){
      case 'newAlert':
        return <NewAlert item={item} key={index} />
      case 'newComment':
        return <NewComment item={item} key={index} />
      case 'newWorkPlan':
        return <NewWorkPlan item={item} key={index} />
      case 'completedWorkPlan':
        return <WorkPlanStatus item={item} key={index} />
      case 'unCompletedWorkPlan':
        return <WorkPlanStatus item={item} key={index} />
      default:
        return <div>Empty</div>
    }
  }

  render() {

    const { classes, newsFeed, loadingNewsFeed } = this.props

    return (
      <Card className={classes.newsFeedContainer}>
        <Typography variant={'h6'} className={classes.activityHeader}>
          Recent Activity
        </Typography>
        
        {newsFeed.map((feedBlock, outerI) => {
          return (
            feedBlock.map((item, innerI) => { return this.feedItem(item, `${outerI}${innerI}`) } )
          )
          // If loading spin stuff
        })}
      </Card>
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
