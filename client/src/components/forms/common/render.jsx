import React  from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputWithRange from "components/input/InputWithRange";
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import AutoDownshift from 'components/downshift/AutoDownshift'

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id={label + Math.random().toString()}
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)


export const renderNumberField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id={label + Math.random().toString()}
    label={label}
    placeholder={label}
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)


export const renderDateField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id={label + Math.random().toString()}
    label={label}
    placeholder={label}
    type="date"
    error={touched && invalid}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
)



export const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)


export const renderInputWithRange =  ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (

  <FormControl className={custom.className}>
      <Input
          id={label + Math.random().toString()}
          label={label}
          error={touched && invalid}
          placeholder ={label+ ' from ' + custom.min + ' to '+ custom.max}
          value = {input.value}
          onChange ={input.onChange}
          endAdornment={<InputAdornment position="end">points</InputAdornment>}
          {...input}
          {...custom}
          inputProps={{
              'aria-label': {label},
          }

        }
      />
      <FormHelperText id={label+'helper-text'} className={custom.className}> {error}</FormHelperText>
  </FormControl>
)


export const renderDownshift = ({
  label,
  input,
  meta: { touched, invalid, error },
  initialValue,
  ...custom
}) => (
  <FormControl className={custom.className}>
<div>
    <AutoDownshift
      id={label + Math.random()}
      label={label}
      placeholder = {custom.placeholder}
      error={touched && invalid}
      source = {custom.source}
      input = {input}
      initialValue = {initialValue}
      className={custom.className}
    />
    <FormHelperText id={label+'helper-text'} className={custom.className}>{error}</FormHelperText>
    </div>
  </FormControl>

)
