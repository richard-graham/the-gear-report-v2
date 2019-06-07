
//Mui
import InputBase from '@material-ui/core/InputBase'
//Icons
import SearchIcon from '@material-ui/icons/Search';


import React, { Component } from 'react'
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { textCompletion } from '../../redux/actions/dataActions'
import { updateSearchLocation } from '../../redux/actions/tcActions'
import { connect } from 'react-redux'
//Mui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';









const styles = theme => ({
  ...theme,
  root: {
    flexGrow: 1,
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
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    color: 'white',
    padding: '7px'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});




export class Search extends Component {
  state = {
    input: '',
    typing: false,
    loading: false,
    typingTimeout: 0
  }

  renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
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

    updateSearchLocation(id, this.props.country)
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
    const { classes } = this.props;
    return (
      <div className={classes.navSearch}>
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
                  placeholder: 'Search a country (start with a)',
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
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  suggestions: state.data.searchResults,
  country: state.UI.country
})

const mapDispatchToProps = {
  textCompletion,
  updateSearchLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search))




