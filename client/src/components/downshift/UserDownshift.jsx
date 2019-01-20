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


const styles = theme => ({
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
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

let popperNode;

function getSuggestions(value, source) {
    if (value === undefined || !value || source==undefined) {return []}

    const inputValue = deburr(value.trim()).toLowerCase();

    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : source.filter(suggestion => {
            const keep =
                count < 5 &&  suggestion.name.toLowerCase().includes(inputValue);

            if (keep) {
                count += 1;
            }
            return keep;
        });
}


function UserDownshift(props) {
    const {classes, users} = props;


    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default withStyles(styles)(UserDownshift)
