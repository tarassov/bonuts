import React, {useEffect} from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import defaultImage from "assets/img/bonuts_sm.png";
import defaultAvatar from "assets/img/placeholder.png";
import ButtonBase from '@material-ui/core/ButtonBase';
import {useTranslation} from 'react-i18next'
import { useModal } from "hooks/useModal";
import {IMAGE_PREVIEW} from "modals/modalList";

export default function ImagePreview(props) {
  const [file, setFile] = React.useState(null);

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.image ? props.image : (props.avatar ? defaultAvatar : defaultImage)
  );



  const {t} = useTranslation()

  const {showModal} = useModal(IMAGE_PREVIEW)

  const previewModal=()=>{
    showModal({image:props.image, default:defaultImage })
  }  
  
  let { avatar,image } = props;
  return (
    <div className="fileinput text-center">
       <ButtonBase onClick={previewModal}>
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
            <img src={imagePreviewUrl} alt="..." />
        </div>   
      </ButtonBase>      
      </div>
  );
}

ImagePreview.propTypes = {
  avatar: PropTypes.bool,
  image: PropTypes.string,
};
