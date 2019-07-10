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
import Edit from "@material-ui/icons/Edit";


import listStyle from "assets/jss/layouts/listStyle";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";

class AccountOperations extends Component {
    componentDidMount(){
        this.props.loadItems()    
      }
    
  
      render() {
                const { classes,account_operations} = this.props;
                let items =[]
                if (account_operations !==undefined && account_operations.items !== undefined){                
                    items = account_operations.items.map(item=>{
                    return {
                        id: item.id, 
                        sum: item.direction*item.amount,
                        comment: item.comment, 
                        created_at:  item.created_at!==null ?item.created_at:"-",
                        values: [
                            item.created_at!==null ?item.created_at:"-",
                            item.direction*item.amount,
                            item.comment!==null ?item.comment:"",
                        ]}
                    })
                    items = items.sort((a,b) =>{
                        if (a.created_at > b.created_at) {
                          return -1;
                        }
                        if (a.created_at < b.created_at) {
                          return 1;
                        }
                     
                        return 0;
                      })
                }
    
                let actions = [
                
    
                ]
                return (
                  <GridContainer>
                    <GridItem xs={12} >
                    <Card>
                      <CardHeader color="primary">
                      <CustomTableToolbar actions={actions}>
                        <h4 className={classes.cardTitleWhite}><Trans>History</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                      <CustomTable
                        items = {items}
                        actions =  {[
                           
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
export default withStyles(listStyle)(AccountOperations);