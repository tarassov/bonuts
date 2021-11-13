import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "assets/jss/templateFileStyle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
import { push } from "redux-first-history";


const useStyles = makeStyles(styles);

export default function TemplatePage(props)  {
 

    const classes = useStyles();
    const { t } = useTranslation();

    const dispatch = useDispatch()

    const click = useCallback((route) => {
       
    }, []);

    return (
      <React.Fragment>

       
      </React.Fragment>
    )
}

