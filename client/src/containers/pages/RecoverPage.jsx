import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import confrimEmailStyle from 'assets/jss/components/confrimEmailStyle'
import { withStyles } from '@material-ui/core/styles';
import { translate, Trans } from "react-i18next";
import {loadByToken, confirmEmail} from 'actions/profile/profileActions';
import  { Redirect } from 'react-router-dom'

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



class RecoverPage  extends  Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.loadByToken(this.props.match.params.token)
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
                    <form onSubmit={this.props.handleSubmit} className={classes.container}>
                        <Field
                            name="new_password"
                            id ="new_password"
                            label="new_password"
                            component={renderTextField}
                            type="new_password"
                            autoComplete="off"
                            className={classes.button}
                        />
                        <br/>
                         <Button
                            type="submit"
                            className={classes.textField}
                            color="primary"
                        >
                            <Trans>Change password</Trans>
                        </Button>
                      </form>
                    </div>
            </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(confrimEmailStyle)(translate()(ConfirmEmailPage)))
