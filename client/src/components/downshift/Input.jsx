import React from 'react';
import TextField from '@material-ui/core/TextField';

function Input(inputProps) {
    const { InputProps, classes, ref,options, ...other } = inputProps;
    return (
        <TextField
            {...options}
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps
            }}
            {...other}
        />
    );
}

export default  Input
