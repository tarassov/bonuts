import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Print from "@material-ui/icons/Print";
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


import listStyle from "assets/jss/layouts/listStyle.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";



const getActivatedItems = (items) =>{
  return items.filter(item=>{
          if (item.status===2)  return item
        }
  )
}

const notActivatedItems = (items) =>{
  return items.filter(item=>{
          if (item.status===0 || item.status === 1)  return item
        }
  )
}

class Regards extends React.Component {
  componentDidMount(){
    //if (this.props.regards.page == 0)this.props.loadRegards()
      //this.props.regards.page = this.props.regards.page + 1
      this.props.loadRegards();
  }

  onPrint(item) {
    console.log(item)
    this.props.onPrint(item)
  }

  redirectToStore() {
    this.props.onRedirectToStore()
  }
  render() {
            const { classes,regards} = this.props;
            let items = regards.items.map(item=>{
              return {
                id: item.id, 
                public_uid: item.public_uid,
                name: item.name, 
                status: item.status,
                values: [item.donut_name]}
            })

            let actions = [
              {
                id: 'redirectToStore1', 
                label: 'Add', 
                icon: (<Store className={classes.tableActionButtonIcon}/>),
                onClick: this.redirectToStore.bind(this)
              }

            ]
            
            return (
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                <Card>
                  <CardHeader color="primary">
                  <CustomTableToolbar actions={actions}>
                    <h4 className={classes.cardTitleWhite}><Trans>Regards i can use</Trans></h4>
                  </CustomTableToolbar>
                  </CardHeader>
                  <CardBody>
                  <CustomTable
                    items = {notActivatedItems(items)}
                    rowClick={this.onPrint.bind(this)}
                    actions =  {[
                        {
                          icon: (<Print className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                          id: 'action_print_regard',
                          label: 'Print',
                          onClick: (item) => this.onPrint.bind(this,item)
                        },
                      ]}
                    checkable = {false}
                  />
                  </CardBody>
                  </Card>
                 </GridItem>
                 <GridItem xs={12} sm={6} md={6}>
                 <Card>
                  <CardHeader color="secondary">
                  <CustomTableToolbar>
                    <h4 className={classes.cardTitleWhite}><Trans>Already used regards</Trans></h4>
                  </CustomTableToolbar>
                  </CardHeader>
                  <CardBody>
                  <CustomTable
                    items = {getActivatedItems(items)}
                    actions={[]}
                    checkable = {false}
                  />
                      </CardBody>
                  </Card>
                 </GridItem>
              </GridContainer>
              )

  }
}

export default withStyles(listStyle)(Regards);
