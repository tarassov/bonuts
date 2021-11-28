import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Store from "@material-ui/icons/Store";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import { withTranslation, Trans } from "react-i18next";

import listStyle from "assets/jss/layouts/listStyle.jsx";
import CustomTableToolbar from "../components/base/table/CustomTableToolbar";
import Add from "@material-ui/icons/Add";

class People extends React.Component {
  componentDidMount() {
    this.props.loadProfiles();
  }

  open(profile) {
    let disabled = !this.props.profile.admin;
    this.props.onEdit(profile, disabled);
  }

  adminDeposit(profile) {
    this.props.onAdminDeposit(profile);
  }

  getProfiles(items, department) {
    return items
      .filter(
        (item) =>
          item !== null &&
          ((item.department === null && department === null) ||
            (item.department !== null &&
              department !== null &&
              item.department.id === department.id))
      )
      .map((profile) => {
        return {
          id: profile.id,
          ...profile,
          values: [profile.name],
          avatar: profile.user_avatar,
        };
      });
  }

  getDepartmenrsSorted(departments) {
    return departments.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
  }

  onAdd() {
    this.props.onAdd();
  }
  render() {
    const { classes, profiles, departments } = this.props;
    let actions = [
      {
        id: "add_new_department",
        label: "Add",
        icon: <Add className={classes.tableActionButtonIcon} />,
        onClick: this.onAdd.bind(this),
      },
    ];

    const withoutDep = this.getProfiles(profiles.items, null);

    return (
      <React.Fragment>
        {withoutDep.length > 0 && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="secondary">
                  <CustomTableToolbar actions={actions}>
                    <h4 className={classes.cardTitleWhite}>
                      <Trans>Without depratment</Trans>
                    </h4>
                  </CustomTableToolbar>
                </CardHeader>
                <CardBody>
                  <CustomTable
                    items={withoutDep}
                    rowClick={this.open.bind(this)}
                    actions={[
                      {
                        icon: (
                          <AttachMoney
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        ),
                        id: "admin_deposit",
                        label: "Deposit 50",
                        visible: this.props.profile.admin,
                        onClick: this.adminDeposit.bind(this),
                      },
                      {
                        icon: (
                          <Edit
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        ),
                        id: "edit_user",
                        label: "Edit",
                        onClick: this.open.bind(this),
                      },
                    ]}
                    checkable={false}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )}
        {this.getDepartmenrsSorted(departments.items).map((department) => (
          <GridContainer
            key={department !== null ? department.id : "undefined_department"}
          >
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <CustomTableToolbar actions={actions}>
                    <h4 className={classes.cardTitleWhite}>
                      <Trans>
                        {department !== null
                          ? department.name
                          : "Without depratment"}
                      </Trans>
                    </h4>
                  </CustomTableToolbar>
                </CardHeader>
                <CardBody>
                  <CustomTable
                    items={this.getProfiles(profiles.items, department)}
                    rowClick={this.open.bind(this)}
                    actions={[
                      {
                        icon: (
                          <AttachMoney
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        ),
                        id: "admin_deposit",
                        label: "Deposit 50",
                        visible: this.props.profile.admin,
                        onClick: this.adminDeposit.bind(this),
                      },
                      {
                        icon: (
                          <Edit
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        ),
                        id: "edit_user",
                        label: "Edit",
                        onClick: this.open.bind(this),
                      },
                    ]}
                    checkable={false}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        ))}
      </React.Fragment>
    );
  }
}

export default withStyles(listStyle)(People);
