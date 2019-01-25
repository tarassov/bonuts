import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import confrimEmailStyle from 'assets/jss/components/confrimEmailStyle'
import { withStyles } from '@material-ui/core/styles';
import { translate, Trans } from "react-i18next";

const mapDispatchToProps = (dispatch) => {
    return {

      confirmEmail: () => {


      },
    }
}


const  mapStateToProps = (state) => {
      return{
        authenticate: state.authenticate,

      }
}



class ConfirmEmailPage  extends  Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

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
