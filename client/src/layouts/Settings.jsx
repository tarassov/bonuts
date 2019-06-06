import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DynamicForm from 'components/forms/DynamicForm';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import StorePage from "containers/pages/StorePage";
import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import settingsStyles from "assets/jss/layouts/settingsStyles.jsx";

class Settings extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  click = (values) => {
    let profile_ids = this.props.dashboard.profiles.map(profile => profile.id);
    this.props.onShare(values.points, profile_ids, values.message);
  };
  render() {
    const {classes} = this.props
    return (<GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><Trans>New points for all users</Trans></h4>
          </CardHeader>
          <CardBody>
          <DynamicForm 
            formId={"share_all"} 
            fields={[{ name: "points" }, { name: "message" }]} 
            submitCaption={"Send to all"} 
            onSubmit={this.click.bind(this)} 
          />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
      <Card>
          <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}><Trans>Activate regard code</Trans></h4>
          </CardHeader>
          <CardBody>
        <DynamicForm formId={"activate_code"} fields={[{ name: "code" }]} submitCaption={"Activate"} color="info"/>
        </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <StorePage />
      </GridItem>
    </GridContainer>);
  }
}

export default withStyles(settingsStyles)(Settings)