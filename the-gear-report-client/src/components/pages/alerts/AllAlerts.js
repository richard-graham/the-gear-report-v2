import React from 'react'
import { getAlerts } from '../../../redux/actions/dataActions'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import CreateAlert from '../../dialogs/CreateAlert'
//Mui
import {
  Search
} from '@material-ui/icons'

export class AllTickets extends React.Component {
  state = {
    createAlertOpen: false
  }

  componentDidMount = () => {
    this.props.handleDrawerClose()
    this.props.getAlerts()
  }

  closeCreateAlert = () => {
    this.setState({
     createAlertOpen: false
    })
  }

  render() {
    const { alerts } = this.props
    return (
      <div className='tickets-container'>
        <MaterialTable 
          className='tickets-table' 
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
            pageSizeOptions: [10, 20, 50]
          }}
          actions={[
            {
              icon: Search,
              tooltip: 'More Info',
              onClick: (e, rowData) => {
                this.props.history.push(`/alerts/${rowData.alertId}`)
              },
            },
            {
              icon: 'add',
              tooltip: 'Add Alert',
              isFreeAction: true,
              onClick: () => this.setState({ createAlertOpen: true })
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

const mapStateToProps = state => ({
  alerts: state.data.alerts
})

const mapDispatchToProps = {
  getAlerts
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTickets)