/*eslint-disable*/
import React from "react";

import bonuts_img from "assets/img/bonuts_sm.png";
import PropTypes from "prop-types";
import { checkPropTypes } from "prop-types";

export default function PictureUpload({onImageChange,image}) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    image ? image : bonuts_img
  );
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(newFile);
      // @ts-ignore
      setImagePreviewUrl(reader.result);
      onImageChange(newFile)
    };
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };
  return (
    <div className="picture-container">
      <div className="picture">
        <img src={imagePreviewUrl} className="picture-src" alt="..." />
        <input type="file" onChange={(e) => handleImageChange(e)} />
      </div>
      <h6 className="description">Choose Picture</h6>
    </div>
  );
}

PictureUpload.propTypes={
  onImageChange: PropTypes.func,
}