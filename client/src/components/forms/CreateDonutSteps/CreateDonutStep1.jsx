import React from "react";
// @material-ui/icons
import Face from "@material-ui/icons/DonutLargeTwoTone";
import AttachMoney from "@material-ui/icons/AttachMoney";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import PictureUpload from "components/base/customUpload/PictureUpload";
import CustomInput from "components/base/customInput/CustomInput";
import { useTranslation } from "react-i18next";
import StoreApi from  'api/listApi/storeApi'
import Storage from "common/storage";
 

const styles = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  inputAdornment: {
    position: "relative",
  },
};


const useStyles = makeStyles(styles);

const Step1 = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [name, setName] = React.useState("");
  const [nameState, setNameState] = React.useState("");

  const[logo, setLogo] = React.useState("");
  

  const [price, setPrice] = React.useState("");
  const [priceState, setPriceState] = React.useState("");

  const [error, setError] = React.useState("");

  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      return isValidated();
    },
    sendState: () => {
      return sendState();
    },
    state: {
      name,
      nameState,
      price,
      priceState,
      logo,
    },
  }));
  const sendState = () => {
    return {
      name,
      nameState,
      price,
      priceState,
      logo,
    };
  };

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const verifyName = (value) => {
    StoreApi.check_donut_name(Storage.getToken(),value).then((response)=>{
        if(!response.ok){
          setNameState("error")
          setError(response.errorMessage)
        }
      })
  };


  const verifyPrice = (value) => {  
    if (value > 0) {  
       return true;      
    }
    return false;
  };
  const isValidated = () => {    
    if (
      nameState === "success" &&
      priceState === "success"
    ) {    
      return true
    }    
    return false;
  };

  const logoChange= (logo) =>{
    setLogo(logo)
  }

 
  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={12}>
        <h4 className={classes.infoText}>
          Let{"'"}s start with the basic information (with validation)
        </h4>
      </GridItem>
      <GridItem xs={12} sm={4}>
        <PictureUpload onImageChange={logoChange}/>
      </GridItem>
      <GridItem xs={12} sm={6}>
        <CustomInput
          success={nameState === "success"}
          error={nameState === "error"}
          labelText={
            <span>
              {t("Donut name")} <small>(  {t("required")})</small>
              {error != "" && <span>{t(error)}</span>}
            </span>             
          }
          id="name"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: (event) => {
              setError("")
              verifyName(event.target.value)
              if (!verifyLength(event.target.value, 3)) {
                setNameState("error");
              } else {
                setNameState("success");
              }
              setName(event.target.value);
            },
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Face className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={priceState === "success"}
          error={priceState === "error"}
          labelText={
            <span>
              {t("Price")} <small>({t("required")})</small>
            </span>
          }
          id="price"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "number",
            onChange: (event) => {
              if (!verifyPrice(event.target.value)) {
                setPriceState("error");
              } else {
                setPriceState("success");
              }
              setPrice(event.target.value);
            },
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <AttachMoney className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>    
    </GridContainer>
  );
});

Step1.displayName = "Step1";

export default Step1;
