import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from './Input'
import Suggestion from './Suggestion'

const suggestions = [
    { id:1, label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
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
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

let popperNode;

function getSuggestions(value, source) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    console.log(source)
    console.log(suggestions)
    return inputLength === 0
        ? []
        : source.filter(suggestion => {
            const keep =
                count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }
           console.log(keep)
            return keep;
        });
}


function UserDownshift(props) {
    const {classes, users} = props;


    return (
        <div className={classes.root}>
                <Downshift id="downshift-user"
                           itemToString={i => i ? i.name  + "  " + i.email: "" }
                           onChange={selectedItem => props.userChanged(selectedItem)}
                >
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
                            <Input
                                fullWidth={true}
                                classes = {classes}
                                InputProps ={getInputProps({placeholder: 'Search user'})}
                            />
                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(inputValue, users).map((suggestion, index) =>
                                            <Suggestion
                                                key = {suggestion.id}
                                                suggestion = {suggestion}
                                                index = {index}
                                                itemProps = {getItemProps({ item: suggestion })}
                                                highlightedIndex={highlightedIndex}
                                                selectedItem = {selectedItem}
                                            />
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    )}
                </Downshift>
        </div>
    )
}

export default withStyles(styles)(UserDownshift)
