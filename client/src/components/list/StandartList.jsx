import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import CustomTableToolbar from "components/table/CustomTableToolbar";
import { useTranslation } from 'react-i18next';
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import listStyle from "assets/jss/layouts/listStyle";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";


function StandartList(props){

    const {classes, list,name,editItem,loadItems,deleteItem,addItem, getValues} = props

    const { t, i18n } = useTranslation();
    useEffect(() => {
      loadItems();      
    },[])

    
    const onDelete = (item) =>{
      console.log("Delete");
      // deleteItem(item)
    }

    const onAdd = () => {
      console.log("Add");
       addItem();
    }
      
    const onEdit=(item) =>{
      console.log("Edit");
      editItem(item)
    } 

           
    let items= []
    if (list !==undefined && list.items !== undefined){                
        items = list.items.map(item=>{
            return {
                ...item,
                values: getValues !==undefined ? getValues(item):[item.comment]        
            }
        })
      }

    let header_actions = [
      {
        id: 'add_new_item_'+name, 
        label: 'Add', 
        icon: (<Add className={classes.tableActionButtonIcon}/>),
        onClick: onAdd
      }
    ]
  
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="secondary">
          <CustomTableToolbar actions={header_actions}>
            <h4 className={classes.cardTitleWhite}><Trans>name</Trans></h4>
          </CustomTableToolbar>
          </CardHeader>
     
          <CardBody>
          <CustomTable
            items = {items}
            actions =  {[
                {
                  icon: (<Delete className={classes.tableActionButtonIcon + " " + classes.delete}/>),
                  id: 'delete_item_action_'+name,
                  label: 'Delete',
                  onClick: onDelete
                },
                {
                  icon: (<Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                  id: 'edit_item_action_'+name,
                  label: 'Edit',
                  onClick: onEdit
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

export default withStyles(listStyle)(StandartList);