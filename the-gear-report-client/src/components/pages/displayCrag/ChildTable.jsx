import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSearchLocation } from '../../../redux/actions/tcActions'
import { Link } from 'react-router-dom'
//Mui
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Icons
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar'
import SignalCellular1Bar from '@material-ui/icons/SignalCellular1Bar'
import SignalCellular2Bar from '@material-ui/icons/SignalCellular2Bar'
import SignalCellular3Bar from '@material-ui/icons/SignalCellular3Bar'
import SignalCellular4Bar from '@material-ui/icons/SignalCellular4Bar'

class ChildTable extends Component {

  getPopularity = (pop) => {
    if(pop >= 80) return <SignalCellular4Bar />
    else if(pop >= 60) return <SignalCellular3Bar />
    else if(pop >= 40) return <SignalCellular2Bar />
    else if(pop >= 20) return <SignalCellular1Bar />
    else if(pop >= 0) return <SignalCellular0Bar />
    else return <SignalCellular0Bar />
  }

  render() {
    const { children, classes } = this.props
    const popArr = children.map(child => child).sort((a, b) => Number(b.ascentCount) - Number(a.ascentCount))
    // Sorts walls by highest number of routes
    children.sort((a, b) => Number(b.numberRoutes) - Number(a.numberRoutes))
    //Get popularity
    popArr.map((child, i) => child.popularity = 100 - (i * Math.floor(100 / popArr.length )))
    console.log(popArr);
    console.log(children);
  
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align={'center'}>Name</TableCell>
            <TableCell align={'center'}>Routes</TableCell>
            <TableCell align={'center'}>Avg Height</TableCell>
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
                
                <TableRow key={i} hover component={Link} to={`/location/${child.id}`} >
                  <TableCell align={'center'}>{name}</TableCell>
                  <TableCell align={'center'}>{numberRoutes}</TableCell>
                  <TableCell align={'center'}>{averageHeight && `${averageHeight[0]}${averageHeight[1]}`}</TableCell>
                  <TableCell align={'center'}>{styleMarkup}</TableCell>
                  <TableCell align={'center'}>{subType ? subType : type}</TableCell>
                  <TableCell align={'center'}>{this.getPopularity(popularity)}</TableCell>
                </TableRow>
              
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

const styles = theme => ({
  // table: {
  //   width: '100%',
  //   overflowX: 'auto',
  // },
})

const mapStateToProps = (state) => ({
  country: state.UI.country
})

export default connect(mapStateToProps, { updateSearchLocation })(withStyles(styles)(ChildTable))