import React from "react";
import PropTypes from "prop-types";
import ImageLoader from "components/ImageLoader";

function UserImage(props) {
  const { classes, changeable, saveAvatar, account } = props;

  return (
    <React.Fragment>
      <ImageLoader
        save={saveAvatar}
        changeable
        loaded_image={account.user_avatar}
        objectId={account.id}
      />
    </React.Fragment>
  );
}
UserImage.propTypes = {
  saveAvatar: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  changeable: PropTypes.bool,
};

export default UserImage;
