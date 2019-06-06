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
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";

import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardIcon from "components/card/CardIcon.jsx";
import CardBody from "components/card/CardBody.jsx";
import CardFooter from "components/card/CardFooter.jsx";


import regardsStyle from "assets/jss/components/regardsStyle.jsx";

const items_mock = [
  {
    id: 111,
    values: ['Один день отпуска без зп','бессрочно'],
  },
  {
    id: 222,
    values: ['Час на Бали','действительно до 2020 года']
  }

]


class Regards extends React.Component {
  componentDidMount(){
    if (this.props.regards.page == 0)this.props.loadRegards()
      this.props.regards.page = this.props.regards.page + 1

  }

  onPrint(item) {
    console.log(item)
    this.props.onPrint(item)
  }
  render() {
            const { classes,regards} = this.props;
            let items = regards.items.map(item=>{
              return {id: item.id, public_uid: item.public_uid,name: item.name, values: [item.donut_name]}
            })
            return (
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                    <p className={classes.cardCategoryWhite}>
                      New employees on 15th September, 2016
                    </p>
                  </CardHeader>
                  <CardBody>
                  <CustomTable
                    items = {items}
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
                  <CustomTable
                    items = {items_mock}
                    actions={[]}
                    checkable = {false}
                  />
                 </GridItem>
              </GridContainer>
              )

  }
}

export default withStyles(regardsStyle)(Regards);
