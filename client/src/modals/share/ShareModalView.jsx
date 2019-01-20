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

  state = {
        title: this.props.title,
        definition: this.props.definition,
        user: {},
        amount: 0
    };



  componentDidMount() {
      this.props.loadUsers();
  }





  share = () => {
    this.props.onShare(this.state.amount, this.props.profile, this.state.user)
  }

  handleSubmit = values => {
      console.log(values)

  }

  amountChanged =(amount) => {
    this.setState({ amount: amount });
  }
  userChanged = (user) =>{
    this.props.enqueueSnackbar({
                                   message: 'Selected: ' + user.name,
                                   options: {
                                       variant: 'info',
                                       action: <Button size="small">Dismiss</Button>,
                                   },
                               });
    this.setState({ user: user });

  }

    rangeError = () => {
        this.props.enqueueSnackbar({
            message: 'Range error.',
            options: {
                variant: 'error',
            },
        });
    }



  submit = values => {
      this.props.onShare(values.point_amount, this.props.profile, values.user)
      this.props.onClose()  
  }

render() {
    const { classes,title,definition, links, open,fullScreen, dashboard,pristine, reset, submitting} = this.props;
    let linkNumber = 0;
    return (
        <React.Fragment>

          <DialogTitle id="modal_dialog">Share dialog</DialogTitle>

          <DialogContent className={classes.root}>
            <ShareForm
              onSubmit= {this.submit}
              label='Points'
              measure ='pts'
              minValue ={0}
              maxValue ={100}
              users = {dashboard.users}
              userChanged = {this.userChanged}
            />

          </DialogContent>
          <DialogActions>
              <Button onClick={this.props.onClose} color="primary" autoFocus>
                  Close
              </Button>
          </DialogActions>

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
