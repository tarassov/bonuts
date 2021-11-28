import React, {useEffect} from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/base/customButtons/RegularButton";

import defaultImage from "assets/img/bonuts_sm.png";
import defaultAvatar from "assets/img/placeholder.png";

import {useTranslation} from 'react-i18next'

export default function ImageUpload(props) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.image ? props.image : (props.avatar ? defaultAvatar : defaultImage)
  );


  const {t} = useTranslation()

  let fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      // @ts-ignore
      setImagePreviewUrl(reader.result);
      props.onImageChange(file)      
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself  
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
    props.onImageChange({url:null}) 
  };
  let { avatar,image, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {(file === null && image===null) ? (
          <Button color="secondary" size="sm" {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? t("Add Photo") : t("Select image")}
          </Button>
        ) : (
          <span>
            <Button color="secondary"size="sm" {...changeButtonProps} onClick={() => handleClick()}>
              {t("Change")}
            </Button>
            {image ? <br /> : null}
            <Button color="danger" size="sm" {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> {t("Remove")}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  image: PropTypes.object,
  onImageChange: PropTypes.func,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
};
