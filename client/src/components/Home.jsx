import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {push } from 'connected-react-router'

import homeStyle from 'assets/jss/components/homeStyle'

class Home extends React.Component {


  handleLogIn = () => {
      this.props.onLoginRedirect()
  }
  handleRegister = () => {
      this.props.onRegisterRedirect()
  }

  render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                  Do Nuts
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  Fast and simple way to   encourage your colleagues and thank them for their patience and help.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.handleGuestLogin}>
                         Demo
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" onClick={this.handleLogIn}>
                        Sign In
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" onClick={this.handleRegister}>
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>

          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="caption" align="center" color="textSecondary" component="p">
            ЦКИ 2019
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>
      );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  onLoginRedirect: PropTypes.func.isRequired,
  onRegisterRedirect: PropTypes.func.isRequired,
};

export default withStyles(homeStyle)(Home);
