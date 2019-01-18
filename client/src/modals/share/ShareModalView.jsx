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
import UserDownshift from 'components/downshift/UserDownshift'
import InputWithRange from "components/input/InputWithRange";


class ShareModalView extends React.Component {

  state = {
        title: this.props.title,
        definition: this.props.definition
    };



  componentDidMount() {
      this.props.loadUsers();
  }





  share = () => {
    this.props.enqueueSnackbar({
          message: 'Failed fetching data.',
          options: {
              variant: 'warning',
          },
      });
  }


  userChanged = (user) =>{
    this.props.enqueueSnackbar({
                                   message: 'Selected: ' + user.name,
                                   options: {
                                       variant: 'info',
                                   },
                               });
    }

    rangeError = () => {
        this.props.enqueueSnackbar({
            message: 'Range error.',
            options: {
                variant: 'error',
            },
        });
    }


submit(event){
      event.preventDefault();

  }

render() {
    const { classes,title,definition, links, open,fullScreen, dashboard} = this.props;
    let linkNumber = 0;
    return (
      <React.Fragment>
          <DialogTitle id="modal_dialog">Share dialog</DialogTitle>

          <DialogContent className={classes.root}>
              <InputWithRange
                  label="points"
                  measure ="pts"
                  minValue={0}
                  maxValue={this.props.profile.distrib_balance}
                  onError={this.rangeError.bind(this)}
              />
              <UserDownshift users = {dashboard.users} userChanged = {this.userChanged.bind(this)}/>

          </DialogContent>
          <DialogActions>
              <Button color="primary" onClick={this.share.bind(this)}  >
                    SHARE
              </Button>
              <Button onClick={this.props.onClose} color="primary" autoFocus>
                  Close
              </Button>
          </DialogActions>
      </React.Fragment>
    );
}
}
ShareModalView.propTypes = {
    classes: PropTypes.object.isRequired,
    onShare: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
};

export default  withStyles(shareModalStyle)(withMobileDialog()(ShareModalView));
