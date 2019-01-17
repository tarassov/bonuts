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



class ShareModalView extends React.Component {

  state = {
        edit: false,
        title: this.props.title,
        definition: this.props.definition
    };

  static defaultProps = {
      editable: true,
      deletable: true
  }
  edit = () => {
    this.setState({ edit: true });

  }

  delete =() => {

  }

  share = () => {

  }

  textChanged = name => event => {
      this.setState({ [name]: event.target.value });
  };

  submit(event){
      event.preventDefault();
      this.props.handleEdit(this.state.title, this.state.definition)
      this.setState({ edit: false});
  }

render() {
    const { classes,title,definition, links, open,fullScreen} = this.props;
    let linkNumber = 0;
    return (
      <React.Fragment>
          <DialogTitle id="modal_dialog">Share dialog</DialogTitle>

          <DialogContent>

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
    onShare: PropTypes.func.isRequired
};

export default  withStyles(shareModalStyle)(withMobileDialog()(ShareModalView));