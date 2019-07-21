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
import { optionalCallExpression, placeholder } from '@babel/types';
import FormTextField from 'components/FormTextField';
import {Trans, withTranslation,useTranslation } from 'react-i18next';

export const renderTextField = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl className={custom.className}>
    <TextField
      id={label + Math.random().toString()}
      label={label}
      placeholder={label}
      error={touched && invalid}
      {...input}
      {...custom}    
      disabled = {options!==undefined ? options.disabled: false}
    />
    <FormHelperText id={label+'helper-text'} className={custom.className}><Trans>{error}</Trans></FormHelperText>
  </FormControl> 
)


export const renderNumberField = ({
  label,
  input,
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl className={custom.className}>
  <TextField
    id={label + Math.random().toString()}
    label={label}
    placeholder={label}
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
    error={touched && invalid}
    disabled = {options!==undefined ? options.disabled: false}
    {...input}
    {...custom}
  />
  <FormHelperText id={label+'helper-text'} className={custom.className}><Trans>{error}</Trans></FormHelperText>    
  </FormControl>
)


export const renderDateField = ({
  label,
  input,
  options,
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
    disabled = {options!==undefined ? options.disabled: false}
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
  options,
  meta: { touched, invalid, error },
  ...custom
}) => (

  <FormControl className={custom.className}>
      <Input
          id={label + Math.random().toString()}
          label={label}
          error={touched && invalid}
          placeholder ={placeholder}//{label+ ' from ' + custom.min + ' to '+ custom.max}
          value = {input.value}
          onChange ={input.onChange}
          endAdornment={<InputAdornment position="end">{custom.measure}</InputAdornment>}
          disabled = {options!==undefined ? options.disabled: false}
          {...input}
          {...custom}
          inputProps={{
              'aria-label': {label},
          }

        }
      />
      <FormHelperText id={label+'helper-text'} className={custom.className}> <Trans>{error}</Trans></FormHelperText>
  </FormControl>
)


export function renderDownshift ({
  label,
  input,
  t,
  meta: { touched, invalid, error },
  options,
  ...custom
})  {
  
  return (
  <FormControl className={custom.className}>
    <div>
    <AutoDownshift
      id={label + Math.random()}
      label={label}
      placeholder = {custom.placeholder}
      error={touched && invalid}
      source = {custom.source}
      input = {input}
      options = {options ? options: {}}
      //className={custom.className}
    />
    <FormHelperText id={label+'helper-text'} className={custom.className}><Trans>{error}</Trans></FormHelperText>
    </div>
  </FormControl>
  )
}
