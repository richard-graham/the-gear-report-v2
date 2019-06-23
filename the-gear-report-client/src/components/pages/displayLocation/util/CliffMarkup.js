import React, { Fragment } from 'react'
// Mui Icons
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar'
import SignalCellular1Bar from '@material-ui/icons/SignalCellular1Bar'
import SignalCellular2Bar from '@material-ui/icons/SignalCellular2Bar'
import SignalCellular3Bar from '@material-ui/icons/SignalCellular3Bar'
import SignalCellular4Bar from '@material-ui/icons/SignalCellular4Bar'

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

const getPopularity = (pop) => {
  if(pop >= 80) return <SignalCellular4Bar />
  else if(pop >= 60) return <SignalCellular3Bar />
  else if(pop >= 40) return <SignalCellular2Bar />
  else if(pop >= 20) return <SignalCellular1Bar />
  else if(pop >= 0) return <SignalCellular0Bar />
  else return <SignalCellular0Bar />
}


const CliffMarkup = (props) => {
  const { handleClick } = props
  let { children } = props

  children = cliffChildren(children)
  


  return (
    <Fragment>
      <TableHead>
        <TableRow>
          <TableCell align={'center'}>Name</TableCell>
          <TableCell align={'center'}>Style</TableCell>
          <TableCell align={'center'}>Type</TableCell>
          <TableCell align={'center'}>Popularity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {children.map((child, i) => {
          const { name, subType, type, numberRoutes, styles, style, averageHeight, popularity } = child
          let styleCount = 0
          let mostStyle = ''

          styles && styles.forEach(style => { 
              if(style.total > styleCount){
                styleCount = style.total
                mostStyle = `Mostly ${style.style}`
              }
            })

          const styleMarkup = style ? `All ${style}` : styles.length > 1 ? mostStyle : `All ${styles[0].style}`

          return (
              
              <TableRow key={i} hover onClick={() => handleClick(child)} >
                <TableCell align={'center'}>{name}</TableCell>
                <TableCell align={'center'}>{styleMarkup}</TableCell>
                <TableCell align={'center'}>{subType ? subType : type}</TableCell>
                <TableCell align={'center'}>{getPopularity(popularity)}</TableCell>
              </TableRow>
            
          )
        })}
      </TableBody>
    </Fragment>
  )
}

export default CliffMarkup