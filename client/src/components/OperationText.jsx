import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import { Trans } from "react-i18next";
import ProfileButton from './ProfileButton';
import Grid from '@material-ui/core/Grid';
import {
    successColor,
    dangerColor,
  } from "assets/jss/baseStyles.jsx";

const style = (theme) => ({
    operationText: {
        display: 'inline-flex',
        margin: "auto 2px",
        padding: 2,
        whiteSpace: "pre-wrap",       /* css-3 */
        wordBreak: "break-word",
    },
    amountText:{
        fontSize: 20,
        fontWeight: "bold",
     },
     plusText:{
        color:successColor[1]
     },
     minusText:{
        color:dangerColor[1]
     },
     operationContainer: {
        padding: 0,
        margin: 0,

     },      

      
});

function OperationText(props) {
const {classes,operation,onProfileClick} = props;
const amountClass = classNames({
    [classes.operationText]: true,
    [classes.amountText]: true,
    [classes.plusText]: operation && operation.direction >0,
    [classes.minusText]: operation && operation.direction <0
})


return(
    <React.Fragment>
    {operation !== undefined && operation!==null && <Grid container className={classes.operationContainer}>
        <span className={amountClass}> {operation.direction===-1?"-":"+"}{operation.amount}  </span> 
        <span className={classes.operationText}> <Trans>for</Trans> </span>     
        {operation.profile !== undefined && operation.profile!==null && <ProfileButton profile ={operation.profile} onClick={onProfileClick}/>}
   </Grid>}
   </React.Fragment>
)
}


export default withStyles(style)(OperationText)
