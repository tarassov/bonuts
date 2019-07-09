import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Store from "@material-ui/icons/Store";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";

import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import { withTranslation, Trans } from "react-i18next";


import regardsStyle from "assets/jss/layouts/regardsStyle.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";


class People extends React.Component {
  componentDidMount(){
      this.props.loadProfiles()
  }

  open(profile) {

  }


  getProfiles(items, department){
        return items.filter(item=>item!==null && 
          (
            (item.department===null && department===null)
              || 
            (item.department!==null && department!==null && item.department.id===department.id)
          )
          ).map(profile =>{
          return {
            id: profile.id, 
            name: profile.name,                
            values: [profile.name]}
        })
  }

  getDepartmenrsSorted(departments){

    return departments.sort((a,b) =>{
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
   
      return 0;
    })
  }
 

  render() {
            const { classes,profiles,departments} = this.props;
            let actions = [
             

            ]
            
            return (
              <React.Fragment>
                 <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="secondary">
                      <CustomTableToolbar actions={actions}>
                        <h4 className={classes.cardTitleWhite}><Trans>Without depratment</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                      <CustomTable
                        items = {this.getProfiles(profiles.items,null)}
                        rowClick={this.open.bind(this)}
                        actions =  {[
                            {
                              icon: (<Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                              id: 'edit_user',
                              label: 'Edit',
                              onClick: (item) => this.open.bind(this,item)
                            },
                          ]}
                        checkable = {false}
                      />
                      </CardBody>
                      </Card>
                    </GridItem>                
                  </GridContainer>
                {this.getDepartmenrsSorted(departments.items).map(department =>
                  <GridContainer key={department!==null ? department.id: "undefined_department"}>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="primary">
                      <CustomTableToolbar actions={actions}>
                        <h4 className={classes.cardTitleWhite}><Trans>{department!== null?department.name: "Without depratment"}</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                      <CustomTable
                        items = {this.getProfiles(profiles.items,department)}
                        rowClick={this.open.bind(this)}
                        actions =  {[
                            {
                              icon: (<Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                              id: 'edit_user',
                              label: 'Edit',
                              onClick: (item) => this.open.bind(this,item)
                            },
                          ]}
                        checkable = {false}
                      />
                      </CardBody>
                      </Card>
                    </GridItem>                
                  </GridContainer>
                  )}
              </React.Fragment>
              )

  }
}

export default withStyles(regardsStyle)(People);
