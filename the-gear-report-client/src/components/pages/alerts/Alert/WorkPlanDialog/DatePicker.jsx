import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'


class DatePickerApp extends Component {

  state= {
    selectedDate: new Date()
  }

  render(){
    const {
      handleDateChange,
      selectedDate
    } = this.props
    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='dd/MM/yyyy'
        minDate={new Date()}
        maxDate={moment().add(14, 'days').toDate()}
      />
    )
  }
}

export default DatePickerApp