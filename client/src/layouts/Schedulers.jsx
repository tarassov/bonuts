import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";

import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";
import { useTranslation } from 'react-i18next';
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";


import listStyle from "assets/jss/layouts/listStyle";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";


function Schedulers(props){

    const {classes,list} = props

    const { t, i18n } = useTranslation();
    useEffect(() => {
      props.loadItems();      
    },[])

    
    const onDelete = (item) =>{
     // props.deleteItem(item)
    }

    const onAdd = () => {
         // props.addItem();
    }
      
    const onEdit=(item) =>{
        //props.editItem(item)
    } 
  
         
    let items= []
    if (list !==undefined && list.items !== undefined){                
        items = list.items.map(item=>{
        return {
            id: item.id, 
            comment: item.comment,
            name: item.user_name, 
            amount: item.amount,
            values: [item.comment,item.amount]}
        })
      }

    let header_actions = [
      {
        id: 'add_new_schedule', 
        label: 'Add', 
        icon: (<Add className={classes.tableActionButtonIcon}/>),
        onClick: onAdd()
      }
    ]
  
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="secondary">
          <CustomTableToolbar actions={header_actions}>
            <h4 className={classes.cardTitleWhite}><Trans>Schedule</Trans></h4>
          </CustomTableToolbar>
          </CardHeader>
          <CardBody>
          <CustomTable
            items = {items}
            actions =  {[
                {
                  icon: (<Delete className={classes.tableActionButtonIcon + " " + classes.delete}/>),
                  id: 'delete_schedule_action',
                  label: 'Delete',
                  onClick: (item) => onDelete(item)
                },
                {
                  icon: (<Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                  id: 'edit_schedule_action',
                  label: 'Edit',
                  onClick: (item) => onEdit(item)
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

export default withStyles(listStyle)(Schedulers);