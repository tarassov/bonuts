import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import CheckCircle from "@material-ui/icons/CheckCircle";

import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import { withTranslation, Trans } from "react-i18next";

import listStyle from "assets/jss/layouts/listStyle.jsx";
import CustomTableToolbar from "../components/base/table/CustomTableToolbar";

const getActivatedItems = (items) => {
  return items.filter((item) => {
    if (item.status === 2) return item;
  });
};

const notActivatedItems = (items) => {
  return items.filter((item) => {
    if (item.status === 0 || item.status === 1) return item;
  });
};

class Regards extends React.Component {
  componentDidMount() {
    //if (this.props.regards.page == 0)this.props.loadRegards()
    //this.props.regards.page = this.props.regards.page + 1
    this.props.loadItems();
  }

  activate() {}

  render() {
    const { classes, requests } = this.props;
    let items = requests.items.map((item) => {
      return {
        id: item.id,
        public_uid: item.public_uid,
        name: item.name,
        status: item.status,
        values: [item.donut_name, item.name],
      };
    });

    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="primary">
              <CustomTableToolbar actions={[]}>
                <h4 className={classes.cardTitleWhite}>
                  <Trans>Incoming requests</Trans>
                </h4>
              </CustomTableToolbar>
            </CardHeader>
            <CardBody>
              <CustomTable
                items={notActivatedItems(items)}
                actions={[
                  {
                    icon: (
                      <CheckCircle
                        className={
                          classes.tableActionButtonIcon + " " + classes.activate
                        }
                      />
                    ),
                    id: "Activate_action",
                    label: "Activate",
                    onClick: this.props.onActivate,
                  },
                ]}
                checkable={false}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="secondary">
              <CustomTableToolbar>
                <h4 className={classes.cardTitleWhite}>
                  <Trans>Activated requests</Trans>
                </h4>
              </CustomTableToolbar>
            </CardHeader>
            <CardBody>
              <CustomTable
                items={getActivatedItems(items)}
                actions={[]}
                checkable={false}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(listStyle)(Regards);
