import React, { Component, useContext} from 'react'
import PropTypes from 'prop-types'
import Button from "@material-ui/core/Button";
import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";

import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";
import DialogActions from '@material-ui/core/DialogActions';


import listStyle from "assets/jss/layouts/listStyle";

import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import OperationField from 'components/table/fields/OperationField';


class AccountOperations extends Component {
    componentDidMount(){
       this.props.loadItems(1)
      }
      loadMore = () => {
        this.props.loadItems(this.props.account_operations.page+1)
      }
  
      render() {
                const { classes,account_operations} = this.props;
                let items =[]
                if (account_operations !==undefined && account_operations.items !== undefined){                
                    items = account_operations.items.map(item=>{
                    return {
                        id: item.id, 
                        sum: item.direction*item.amount,
                        operation: item,
                        comment: item.comment, 
                        sender_name: item.sender_name,
                        created_at:  item.created_at!==null ?item.created_at:"-",
                           values: [
                           // item.created_at!==null ?item.created_at:"-",
                           ]}
                    })
                    items = items
                }
    
                let actions = [
                
    
                ]
                return (
                  <React.Fragment>
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
                      >
                          <OperationField receiver sender/>
                      </CustomTable>
                      </CardBody>
                      </Card>
                     </GridItem>                     
                  </GridContainer>
                    <DialogActions>
                    {(account_operations.page+1)*account_operations.per_page<account_operations.total&& <Button  className = {classes.button} onClick={this.loadMore} color="primary" >
                        <Trans>More</Trans>
                    </Button>}
                    </DialogActions>
                    </React.Fragment>
                  )
    
    }
}
export default withStyles(listStyle)(AccountOperations);