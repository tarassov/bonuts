import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation, Trans } from "react-i18next";

import homeStyle from "assets/jss/components/homeStyle";

class Home extends React.Component {
  handleLogIn = () => {
    this.props.onLoginRedirect();
  };
  handleRegister = () => {
    this.props.onRegisterRedirect();
  };
  handleGuestLogin = () => {
    this.props.onDemo();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Do Nuts
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                <Trans>CONST_GREETINGS</Trans>
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleGuestLogin}
                    >
                      <Trans>DEMO</Trans>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleLogIn}
                      data-testid="signin-button"
                    >
                      <Trans>Sign_In</Trans>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleRegister}
                    >
                      <Trans>Sign_Up</Trans>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography
            variant="caption"
            align="center"
            color="textSecondary"
            component="p"
          >
            ЦКИ
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
  onDemo: PropTypes.func.isRequired,
};

export default withStyles(homeStyle)(Home);
