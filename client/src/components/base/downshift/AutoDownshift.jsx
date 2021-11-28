import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Input from "./Input";
import Suggestion from "./Suggestion";

const styles = (theme) => ({
  container: {
    flexGrow: 1,
    position: "relative",
    margin: 0,
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(2),
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: "wrap",
  },
  inputInput: {
    width: "auto",
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
});

function getSuggestions(value, source) {
  if (value === undefined || !value || source == undefined) {
    return [];
  }

  const inputValue = deburr(value.trim()).toLowerCase();

  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : source.filter((suggestion) => {
        const keep =
          count < 5 && suggestion.name.toLowerCase().includes(inputValue);

        if (keep) {
          count += 1;
        }
        return keep;
      });
}

const itemToString = (item) => (item ? item.name : "");

// function callAllEventHandlers(...fns) {
//   return (event, ...args) =>
//     fns.some((fn) => {
//       if (fn) {
//         fn(event, ...args);
//       }
//       return (
//         event.preventDownshiftDefault ||
//         (event.hasOwnProperty("nativeEvent") &&
//           event.nativeEvent.preventDownshiftDefault)
//       );
//     });
// }

function AutoDownshift(props) {
  const {
    classes,
    placeholder,
    source,
    input,
    touched,
    invalid,
    error,
    className,
    options,
  } = props;
  //getInputProps({placeholder: placeholder, touched, invalid, error, onFocus: input.onFocus, onBlur: input.onBlur})
  console.log(props);
  return (
    <React.Fragment>
      <Downshift
        itemToString={itemToString}
        onChange={(selectedItem) => {
          input.onChange(selectedItem);
        }}
        selectedItem={options !== undefined ? options.initialValue : undefined}
        initialSelectedItem={
          options !== undefined ? options.initialValue : undefined
        }
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => (
          <div>
            <Input
              fullWidth={true}
              className={className}
              classes={classes}
              options={options}
              //{...getInputProps({placeholder: placeholder})}
              InputProps={getInputProps({
                placeholder: placeholder,
                touched,
                invalid,
                error,
                onFocus: input.onFocus,
                name: input.name,
              })}
            />
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square elevation={2}>
                  {getSuggestions(inputValue, source).map(
                    (suggestion, index) => (
                      <Suggestion
                        key={suggestion.id}
                        suggestion={suggestion}
                        index={index}
                        itemProps={getItemProps({ item: suggestion })}
                        highlightedIndex={highlightedIndex}
                        selectedItem={selectedItem}
                      />
                    )
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    </React.Fragment>
  );
}

AutoDownshift.propTypes = {
  placeholder: PropTypes.string,
  source: PropTypes.array,
};

export default withStyles(styles)(AutoDownshift);
