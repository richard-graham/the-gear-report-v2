import React from 'react'

const renderMulitpitch = location => {
  return (
    <h1>Stuff</h1>
  )
}

const RouteDetails = (props) => {

  const { 
    location: {
      pitch
    },
    location
  } = props

  return (
    <div>
      {pitch && renderMulitpitch(pitch)}
    </div>
  )
}

export default RouteDetails
