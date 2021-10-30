import React, { Component } from "react";
import PropTypes from "prop-types";

import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";
import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import CustomTableToolbar from "../components/base/table/CustomTableToolbar";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import listStyle from "assets/jss/layouts/listStyle";
import { withTranslation, Trans } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";

class Departments extends Component {
  componentDidMount() {
    this.props.loadItems();
  }

  onAdd() {
    this.props.onAdd();
  }

  render() {
    const { classes, departments } = this.props;
    let items = [];
    if (departments !== undefined && departments.items !== undefined) {
      items = departments.items.map((item) => {
        return {
          id: item.id,
          public_uid: item.public_uid,
          name: item.name,
          head_profile: item.head_profile,
          values: [item.name],
        };
      });
    }

    let actions = [
      {
        id: "add_new_department",
        label: "Add",
        icon: <Add className={classes.tableActionButtonIcon} />,
        onClick: this.onAdd.bind(this),
      },
    ];
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="primary">
              <CustomTableToolbar actions={actions}>
                <h4 className={classes.cardTitleWhite}>
                  <Trans>Departments</Trans>
                </h4>
              </CustomTableToolbar>
            </CardHeader>
            <CardBody>
              <CustomTable
                items={items}
                actions={[
                  {
                    icon: (
                      <Delete
                        className={
                          classes.tableActionButtonIcon + " " + classes.delete
                        }
                      />
                    ),
                    id: "delete_depratment_action",
                    label: "Delete",
                    onClick: this.props.onDelete,
                  },
                  {
                    icon: (
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    ),
                    id: "edit_depratment_action",
                    label: "Edit",
                    onClick: this.props.onEdit,
                  },
                ]}
                checkable={false}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
export default withStyles(listStyle)(Departments);
