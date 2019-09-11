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
import { Button } from '@material-ui/core';


const share_all = 'share_all'
const activate_code='activate_code'
class Settings extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  click = (values) => {
    let profile_ids = this.props.dashboard.profiles.map(profile => profile.id);
    this.props.onShare(values.points, profile_ids, values.message,share_all,values.burn_old);
  };

  activate = (values) => {
    this.props.onActivate(values.code, activate_code);
  }
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
            formId={share_all} 
            fields={[
              { name: "points", xs:12,sm:12,md:12,lg:6 },
              { name: "message",xs:12,sm:12,md:12,lg:6,size:"lg", multiline:true, rows: "5",column:2 },
              { name: "burn_old",label:"Burn old points",xs:12,size:"lg", checkbox: true },
            ]} 
            columns= {[
              {id:1, xs:6},
              {id:2, xs:6}
            ]}
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
        <DynamicForm formId={activate_code} fields={[{ name: "code" }]} submitCaption={"Activate"} color="info" onSubmit={this.activate.bind(this)}/>
        </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <StorePage />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        {false && <Button onClick ={this.props.migrateAvatars}>Migrate Avatars</Button>}
      </GridItem>
      
    </GridContainer>);
  }
}

export default withStyles(settingsStyles)(Settings)