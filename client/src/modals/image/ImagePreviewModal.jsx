import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {useParams} from "react-router-dom";

import { useSelector } from "react-redux";
import RegularButton from "components/base/customButtons/RegularButton";
import { useTranslation } from "react-i18next";


const styles  = (theme) => ({
   imageWrapper:{
      maxWidth:"100%",
      maxHeight: "100%",
      textAlign: "center",
      verticalAlign: "middle",
   },
   imagePreview:{
     maxWidth:"500px",
     display:"block",
     maxHeight: "100%",
     margin: "auto",
     verticalAlign: "middle",
     [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
   }
})

const useStyles = makeStyles(styles);

  
export default function ImagePreviewModal({body, onCloseModal}){

   const {t} = useTranslation()

   const [image, setImage] = useState()

   useEffect(() => {
    if (body.image ===undefined || body.image==="" || body.image===null )  {
      setImage(body.default)
    }else{
      setImage(body.image )
    }
   }, [body])

  
   const classes = useStyles()


   return(
    <div className={classes.imageWrapper} >
      <img src={image} className={classes.imagePreview}   alt="..." />
      <RegularButton color="primary" simple onClick={onCloseModal} >{t("Close")}</RegularButton>
    </div>
  )
}

ImagePreviewModal.propTypes = {
  body: PropTypes.object,
  onCloseModal: PropTypes.func
}
