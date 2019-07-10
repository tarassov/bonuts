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
import Shop from "@material-ui/icons/Shop";


import listStyle from "assets/jss/layouts/listStyle.jsx";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";

class Donuts extends Component {
    componentDidMount(){
        this.props.loadItems()    
      }
    
      onBuy(item) {
        this.props.onBuy(item)
      }


  
      render() {
                const { classes,donuts} = this.props;
                let items =[]
                if (donuts !==undefined && donuts.items !== undefined){                
                    items = donuts.items.map(item=>{
                    return {
                        id: item.id, 
                        name: item.name,                         
                        values: [item.name,item.price]}
                    })
                }
    
                let actions = [
     
                ]
                return (
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                    <Card>
                      <CardHeader color="primary">
                      <CustomTableToolbar actions={actions}>
                        <h4 className={classes.cardTitleWhite}><Trans>Donuts</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                      <CustomTable
                        items = {items}
                        actions =  {[
                             {
                              icon: (<Shop className={classes.tableActionButtonIcon + " " + classes.buy}/>),
                              id: 'buy_donut',
                              label: 'Buy',
                              onClick: (item) => this.onBuy.bind(this,item)
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
export default withStyles(listStyle)(Donuts);