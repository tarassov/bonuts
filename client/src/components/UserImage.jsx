import React from 'react'
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { blue } from '@material-ui/core/colors';
import classNames from "classnames";
import Dropzone from 'react-dropzone';
import userStyle from 'assets/jss/layouts/userStyle';
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from '@material-ui/core/styles';

class  UserImage extends React.Component {

    constructor(props){
        super(props)

        this.state ={
            newLoaded: false,
            preview: null
        }
    }

    readFile(files) {
        if (files && files[0]) {
            let formPayLoad = new FormData();
            formPayLoad.append('uploaded_image', files[0]);
            this.props.saveAvatar(formPayLoad)   
            let preview = URL.createObjectURL(files[0])
            this.setState({newLoaded:true, preview: preview})                   
        }
    }

    render() {
    const {classes} = this.props


    return (
            <React.Fragment>
                 {!this.state.newLoaded && this.props.account.data.user_avatar!==undefined && <img className={classes.image} src={this.props.account.data.user_avatar.url} alt="not found"/>}
                 {this.state.newLoaded && <img className={classes.image} src={this.state.preview} alt="not found"/>}
                         
                <Dropzone   accept={'image/*'} onDrop={acceptedFiles => this.readFile(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className={classes.caption}><Trans>Click to select files</Trans></p>
                                </div>
                                </section>
                            )}
                </Dropzone>
                      
            </React.Fragment>
         )
    }
}

export default withStyles(userStyle)(withTranslation()(UserImage))