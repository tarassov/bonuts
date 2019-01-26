import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import confrimEmailStyle from 'assets/jss/components/confrimEmailStyle'
import { withStyles } from '@material-ui/core/styles';
import { translate, Trans } from "react-i18next";
import {loadByToken} from 'actions/profile/profileActions';

const mapDispatchToProps = (dispatch) => {
    return {
      loadByToken: (confirm_token) => {
         dispatch(loadByToken(confirm_token))
      },

      confirmEmail: () => {


      },
    }
}


const  mapStateToProps = (state) => {
      return{
        authenticate: state.authenticate,
        profile: state.profile
      }
}



class ConfirmEmailPage  extends  Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadByToken(this.props.match.params.token)
    }

    click = () => {
        console.log(this.props.match.params.token)
    }
    render() {

        const {classes} = this.props
          return (
             <div className={classes.root}>
                    <div className={classes.vertical_center}>
                      <Button onClick={this.click} className={classes.button} color="secondary" >
                          <Trans>Confirm</Trans>
                      </Button>
                    </div>
            </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(confrimEmailStyle)(translate()(ConfirmEmailPage)))
