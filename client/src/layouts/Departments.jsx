import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";

import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";


import departmentsStyle from "assets/jss/layouts/departmentsStyle.jsx";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";

class Departments extends Component {
    componentDidMount(){
        this.props.loadDepartments()
    
      }
    
      onDelete(item) {
        this.props.onDelete(item)
      }

      onAdd() {
          this.props.onAdd();
      }
    
  
      render() {
                const { classes,departments} = this.props;
                let items =[]
                if (departments !==undefined && departments.items !== undefined){                
                    items = departments.items.map(item=>{
                    return {
                        id: item.id, 
                        public_uid: item.public_uid,
                        name: item.name, 
                        values: [item.donut_name]}
                    })
                }
    
                let actions = [
                  {
                    id: 'add_new_department', 
                    label: 'Add', 
                    icon: (<Add className={classes.tableActionButtonIcon}/>),
                    onClick: this.onAdd.bind(this)
                  }
    
                ]
                return (
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                    <Card>
                      <CardHeader color="primary">
                      <CustomTableToolbar actions={actions}>
                        <h4 className={classes.cardTitleWhite}><Trans>Departments</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                      <CustomTable
                        items = {items}
                        actions =  {[
                            {
                              icon: (<Delete className={classes.tableActionButtonIcon + " " + classes.delete}/>),
                              id: 'delete_depratment_action',
                              label: 'Delete',
                              onClick: (item) => this.onDelete.bind(this,item)
                            },
                          ]}
                        checkable = {false}
                      />
                      </CardBody>
                      </Card>
                     </GridItem>                     
                  </GridContainer>
                  )
    
    }
}
export default withStyles(departmentsStyle)(Departments);