import React, { useCallback,useEffect } from "react";
import classNames from "classnames"
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardBody from "components/base/card/CardBody";
import Button from "components/base/customButtons/RegularButton";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from 'components/base/card/CardHeader';
import { Avatar, Typography } from "@material-ui/core";
import logo_sm from "assets/img/bonuts_sm.png";
import donutCardStyle from "assets/jss/components/donutCardStyle";
import CardFooter from "./base/card/CardFooter";

const useStyles = makeStyles(donutCardStyle);

export default function DonutCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.donut.logo.url ? props.donut.logo.url : logo_sm
  );

  useEffect(() => {
    setImagePreviewUrl( props.donut.logo.thumb.url ? props.donut.logo.thumb.url : logo_sm)
  }, [props.donut])
 
  const handleClick = () =>{
    props.onClick( props.donut)
  }
  
  return (
    <Card team raised className={classes.donutCard}>     
      <CardActionArea onClick={handleClick} className={classes.cardHover}>
                <CardBody team>  
                <div className={classes.wrapper}>
                    {props.donut.on_stock !==null  && props.donut.on_stock>0 && <div className={classes.remainsContainer}>
                      {t("on stock")}:  {props.donut.on_stock}
                      </div>      
                    }
                    <div className={classes.cardHeaderHover}>
                            <img src={imagePreviewUrl} alt="..."  className={classes.img}/>      
                    </div>       
                </div>
                 <h4> {t("Price")}:  {props.donut.price}</h4>
               
                 <h5 className={`${classes.cardTitle} ${classes.marginTop10}`}>
                  {props.donut.name}
                </h5>              
                </CardBody>
        </CardActionArea>
       
       
        {/* <Button simple color="primary" onClick={handleClick}>
            {t("Buy")}
        </Button> */}

      
    </Card>
  );
}

DonutCard.propTypes = {
  donut: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
