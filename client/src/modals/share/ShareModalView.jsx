import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import  shareModalStyle from 'assets/jss/modals/shareModalStyle'
import TextField from '@material-ui/core/TextField'
import AutoDownshift from 'components/downshift/AutoDownshift'
import InputWithRange from "components/input/InputWithRange";

import ShareForm from './ShareForm'




class ShareModalView extends React.Component {

  componentDidMount() {
      this.props.loadUsers();
  }



  submit = values => {
      this.props.onShare(values.point_amount, this.props.profile, values.user)
      this.props.onClose()
  }

  render() {
    const { classes,title,definition, links, open,fullScreen, profile,pristine, dashboard,reset, submitting} = this.props;
    return (
        <React.Fragment>

          <DialogTitle id="modal_dialog">Share dialog</DialogTitle>
             <ShareForm
              onSubmit= {this.submit}
              label='Points'
              measure ='pts'
              min ={0}
              max ={profile.distrib_balance}
              users = {dashboard.users}
              userChanged = {this.userChanged}
              onClose = {this.props.onClose}
              currentUserId = {profile.id}
            />


        </React.Fragment>
    )
}
}
ShareModalView.propTypes = {
    classes: PropTypes.object.isRequired,
    onShare: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
};

export default  withStyles(shareModalStyle)(withMobileDialog()(ShareModalView));
