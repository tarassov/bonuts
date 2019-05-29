import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import TouchApp from "@material-ui/icons/TouchApp";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import CustomTable from 'components/table/CustomTable';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import trophiesStyle from "assets/jss/components/trophiesStyle.jsx";

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
  render() {
            const { classes,regards} = this.props;
            let items = regards.items.map(item=>{
              return {id: item.id, values: [item.donut_name]}
            })
            return (
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <CustomTable
                    items = {items}
                    actions =  {[
                        {
                          icon: (<TouchApp className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                          id: 'action_use',
                          label: 'Activate'
                        },
                      ]}
                    checkable = {false}
                  />
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

export default withStyles(trophiesStyle)(Regards);
