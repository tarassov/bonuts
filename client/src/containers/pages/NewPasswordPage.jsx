import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import confrimEmailStyle from 'assets/jss/components/confrimEmailStyle'
import { withStyles } from '@material-ui/core/styles';
import { translate, Trans } from "react-i18next";
import {loadByToken, confirmEmail} from 'actions/profile/profileActions';
import  { Redirect } from 'react-router-dom'
import NewPasswordForm from 'components/forms/NewPasswordForm'

const mapDispatchToProps = (dispatch) => {
    return {
      loadByRecover: (recover_token) => {
         dispatch(loadByToken(recover_token))
      },

      recover: (recover_token) => {
        dispatch(confirmEmail(recover_token))
      },
    }
}


const  mapStateToProps = (state) => {
      return{
        authenticate: state.authenticate,
        profile: state.profile
      }
}



class NewPasswordPage  extends  Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadByRecover(this.props.match.params.token)
    }

    click = () => {
        this.props.recover(this.props.match.params.token)
    }
    render() {

        const {classes, profile} = this.props
          if (profile.user_not_found || profile.confirmed)  {
            return (
              <Redirect to= '/dashboard'/>
            )
          }
          return (
             <div className={classes.root}>
                    <div className={classes.vertical_center}>
                    <NewPasswordForm/>
                    </div>
            </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(confrimEmailStyle)(translate()(NewPasswordPage)))
