import React, { Fragment } from 'react'
// Mui Icons
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar'
import SignalCellular1Bar from '@material-ui/icons/SignalCellular1Bar'
import SignalCellular2Bar from '@material-ui/icons/SignalCellular2Bar'
import SignalCellular3Bar from '@material-ui/icons/SignalCellular3Bar'
import SignalCellular4Bar from '@material-ui/icons/SignalCellular4Bar'
import StarRate from '@material-ui/icons/StarRate'
import Warning from '@material-ui/icons/Warning'

// Mui 
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const cliffChildren = children => {
  // Sorts routes by highest number of routes
  children.sort((a, b) => Number(b.numberRoutes) - Number(a.numberRoutes))
  // Make new arr ranked by popularity
  const popArr = children.map(child => child).sort((a, b) => Number(b.ascentCount) - Number(a.ascentCount))
  // Add popularity counter
  popArr.map((child, i) => child.popularity = 100 - (i * Math.floor(100 / popArr.length )))
  popArr.forEach(child => {
    const origIndex = children.findIndex(orig => orig.id === child.id)
    children[origIndex].popularity = child.popularity
  })
  return children
}

const checkAlerts = (id, alerts) => {
  let confirmed = false
  alerts.forEach(alert => {
    if(alert.locations.includes(id) && alert.resolved === false) confirmed = true
  })
  return confirmed
}


const getPopularity = (pop) => {
  if(pop >= 80) return <SignalCellular4Bar />
  else if(pop >= 60) return <SignalCellular3Bar />
  else if(pop >= 40) return <SignalCellular2Bar />
  else if(pop >= 20) return <SignalCellular1Bar />
  else if(pop >= 0) return <SignalCellular0Bar />
  else return <SignalCellular0Bar />
}

const getStars = stars => {
  switch(Number(stars)){
    case 1:
      return <StarRate />
    case 2:
      return <Fragment><StarRate /><StarRate /></Fragment>
    case 3:
      return <Fragment><StarRate /><StarRate /><StarRate /></Fragment>
    default:
      return ''
  }
}


const CliffMarkup = (props) => {
  const { handleClick, alerts } = props
  let { children } = props

  children = cliffChildren(children)
  


  return (
    <Fragment>
      <TableHead>
        <TableRow>
          <TableCell align={'left'} style={{ width: 220 }}>Name</TableCell>
          <TableCell align={'center'}>Alerts</TableCell>
          <TableCell align={'center'}>Grade</TableCell>
          <TableCell align={'center'}>Height</TableCell>
          <TableCell align={'center'}>Style</TableCell>
          <TableCell align={'center'}>Type</TableCell>
          <TableCell align={'center'} style={{ width: 80 }}>Stars</TableCell>
          <TableCell align={'center'}>Popularity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {children.map((child, i) => {
          const { name, subType, type, height, styles, style, stars, popularity, grade } = child
          let styleCount = 0
          let mostStyle = ''
          const hasAlerts = checkAlerts(child.id, alerts)

          styles && styles.forEach(style => { 
              if(style.total > styleCount){
                styleCount = style.total
                mostStyle = `Mostly ${style.style}`
              }
            })

          const styleMarkup = style ? `${style}` : styles.length > 1 ? mostStyle : `${styles[0].style}`

          return (
              
              <TableRow key={i} hover onClick={() => handleClick(child)} >
                <TableCell align={'left'}>{name}</TableCell>
                <TableCell align={'center'}>{hasAlerts ? <Warning /> : ''}</TableCell>
                <TableCell align={'center'}>{grade}</TableCell>
                <TableCell align={'center'}>{height && `${height[0]}${height[1]}`}</TableCell>
                <TableCell align={'center'}>{styleMarkup}</TableCell>
                <TableCell align={'center'}>{subType ? subType : type}</TableCell>
                <TableCell ><div style={{ display: 'flex', flexWrap: 'noWrap', alignItems: 'center', justifyContent: 'center' }}>{getStars(stars)}</div></TableCell>
                <TableCell align={'center'}>{getPopularity(popularity)}</TableCell>
              </TableRow>
            
          )
        })}
      </TableBody>
    </Fragment>
  )
}

export default CliffMarkup