import React, { Component } from 'react'
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { textCompletion, removeSuggestions } from '../redux/actions/dataActions'
import { updateSearchLocation } from '../redux/actions/tcActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
//Mui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';


export class Search extends Component {
  state = {
    input: '',
    typing: false,
    loading: false,
    typingTimeout: 0,
    redirect: false
  }

  renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes[this.props.searchType === 'Nav'
                            ? 'inputNav' : 'inputAlert']
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        onClick={() => this.handleSuggestionClick(suggestion.id, this.props.updateSearchLocation)}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  }

  handleSuggestionClick = (id, updateSearchLocation) => {
    this.props.searchType === 'Nav' 
      ? (
        updateSearchLocation(id, this.props.country, 'searched') 
      ) : this.props.returnIdToParent(id)
      this.props.removeSuggestions()
  }

  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : this.props.suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }


  handleInputChange = (e, textCompletion, country) => {
    e.persist()
    var localArea = Object.keys(country)
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.setState({ typing: true })
    this.setState({
      input: e.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        textCompletion(e.target.value, localArea)
      }, 350)
    })

  }

  render() {
    const { classes, searchType } = this.props;
    const { redirect, id } = this.state
    const divClass = searchType === 'Nav' ? classes.navSearch : classes.alertSearch

    if(redirect) return <Redirect push to={`/location/${id}`}/> && this.setState({ redirect: false })

    return !redirect ? (
      <div className={divClass}>
        <Downshift id="downshift-simple">
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem
          }) => (
            <div className={classes.container}>
              {this.renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  onChange: (e) => this.handleInputChange(e, this.props.textCompletion, this.props.country),
                  placeholder: 'Search Crags...',
                }),
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {this.getSuggestions(inputValue).map((suggestion, index) =>
                      this.renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    ) : ''
  }
}

const styles = theme => ({
  ...theme,
  root: {
    flexGrow: 1,
  },
  alertSearch: {
    marginBottom: '50px',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputAlert: {
    width: 'auto',
    flexGrow: 1,
    color: 'black',
    padding: '7px'
  },
  inputNav: {
    width: 'auto',
    flexGrow: 1,
    color: 'white',
    padding: '7px'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});


Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  suggestions: state.data.searchResults,
  country: state.UI.country
})

const mapDispatchToProps = {
  textCompletion,
  updateSearchLocation,
  removeSuggestions
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search))




