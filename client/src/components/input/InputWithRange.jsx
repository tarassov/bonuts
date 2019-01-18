import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

class InputWithRange extends Component {

    handleChange(){

    }

    render() {

        const {classes, measure} = this.props
        return(
                <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="input-helper-text"
                >
                    <Input
                        id={label + Math.random()}
                        value={this.state.value}
                        onChange={this.handleChange('value')}
                        endAdornment={<InputAdornment position="end">{measure}</InputAdornment>}
                        inputProps={{
                            'aria-label': {label},
                        }}
                    />
                    <FormHelperText id="{label}-helper-text">{label}</FormHelperText>
                </FormControl>
        )
    }
}

InputWithRange.propTypes  ={
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired,
    minNumber: PropTypes.number.isRequired,
    onError: PropTypes.func.isRequired
};



export default withStyles(styles)(InputWithRange);