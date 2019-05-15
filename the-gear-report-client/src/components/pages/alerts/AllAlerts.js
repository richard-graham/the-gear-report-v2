import React from 'react'
import { getAlerts } from '../../../redux/actions/dataActions'
import { setError } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles'
import CreateAlert from '../../dialogs/CreateAlert'
//Mui
import {
  AccountCircle
} from '@material-ui/icons'

export class AllTickets extends React.Component {
  state = {
    createAlertOpen: false
  }

  componentDidMount = () => {
    this.props.getAlerts()
  }

  closeCreateAlert = () => {
    this.setState({
     createAlertOpen: false
    })
  }

  handleRowClick = (e, rowData) => {
    this.props.history.push(`/alerts/${rowData.alertId}`)
  }

  handleCreateAlert = () => {
    this.props.authenticated ? (
      this.setState({ createAlertOpen: true })
    ) : (
      this.props.setError('You must be signed in to add an Alert')
    )
  }

  render() {
    const { alerts, classes } = this.props
    return (
      <div className={classes.allTicketsContainer}>
        <MaterialTable 
          className={classes.allAlertsTable} 
          onRowClick= {(e, rowData) => this.handleRowClick(e, rowData)}
          columns={[
            { title: 'Title', field: 'title', filtering: false, },
            { title: 'Severity', field: 'severity', type: 'numeric'},
            { title: 'Sponsored', field: 'sponsored', type: 'boolean', },
            { title: 'Resolved', field: 'resolved', type: 'boolean' },
            { title: 'Created By', field: 'userHandle'},
            { title: 'Date Created', field: 'createdAt', type: 'date', filtering: false,},
            { title: 'Last Updated', field: 'updated_at', type: 'date', filtering: false,},
          ]}
          style={{
            maxWidth: '100%'
          }}
          data={alerts}
          title="Alert Directory"
          options={{
            filtering: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50],
          }}
          actions={[
            {
              icon: AccountCircle,
              tooltip: 'View Profile',
              onClick: (e, rowData) => {
                this.props.history.push(`/profile/${rowData.userHandle}`)
              },
            },
            {
              icon: 'add',
              tooltip: 'Add Alert',
              isFreeAction: true,
              onClick: () => this.handleCreateAlert()
            }
          ]}
        />
        <CreateAlert
          open={this.state.createAlertOpen} 
          closeAllDialogs={this.closeCreateAlert}
        />
      </div>
    )
  }
}

const styles = theme => ({
  ...theme
})

const mapStateToProps = state => ({
  alerts: state.data.alerts,
  authenticated: state.user.authenticated
})

const mapDispatchToProps = {
  getAlerts,
  setError
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AllTickets))