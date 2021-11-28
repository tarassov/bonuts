import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import imageLoaderStyle from "assets/jss/components/imageLoaderStyle";
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newLoaded: false,
      preview: null,
    };
  }

  readFile(files) {
    if (files && files[0]) {
      let formPayLoad = new FormData();
      formPayLoad.append("uploaded_image", files[0]);
      formPayLoad.append("id", this.props.objectId);
      this.props.save(formPayLoad);
      let preview = URL.createObjectURL(files[0]);
      this.setState({ newLoaded: true, preview: preview });
    }
  }

  render() {
    const { classes, changeable, loaded_image } = this.props;

    return (
      <React.Fragment>
        {!this.state.newLoaded && loaded_image !== undefined && (
          <img
            className={classes.image}
            src={loaded_image.url}
            alt="not found"
          />
        )}
        {this.state.newLoaded && (
          <img
            className={classes.image}
            src={this.state.preview}
            alt="not found"
          />
        )}

        <Dropzone
          accept={"image/*"}
          onDrop={(acceptedFiles) => this.readFile(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              {changeable && (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className={classes.caption}>
                    <Trans>Click to select files</Trans>
                  </p>
                </div>
              )}
            </section>
          )}
        </Dropzone>
      </React.Fragment>
    );
  }
}

ImageLoader.propTypes = {
  save: PropTypes.func.isRequired,
  objectId: PropTypes.string.isRequired,
  loaded_image: PropTypes.object,
  changeable: PropTypes.bool,
};

export default withStyles(imageLoaderStyle)(withTranslation()(ImageLoader));
