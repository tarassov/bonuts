import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import CustomTableToolbar from "../components/base/table/CustomTableToolbar";
import DialogActions from "@material-ui/core/DialogActions";

import listStyle from "assets/jss/layouts/listStyle";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import OperationField from "components/OperationField";

import { useApi } from "hooks/useApi";
import accountOperationsApi from "api/listApi/accountOperationsApi";

const useStyles = makeStyles(listStyle)

export default function AccountOperations(props) {
  
  
  const { id } = useParams();

  const classes = useStyles()

  const {t} = useTranslation()

  const {fetchNext} = useApi(accountOperationsApi,{page: 1, filter:{id: id}})

  const account_operations = useSelector((state) => state.account_operations)


   
  let items = [];
   if (
      account_operations !== undefined &&
      account_operations.items !== undefined
   ) {
      items = account_operations.items.map((item) => {
        return {
          id: item.id,
          sum: item.direction * item.amount,
          operation: item,
          comment: item.comment,
          sender_name: item.sender_name,
          created_at: item.created_at !== null ? item.created_at : "-",
          values: [
            // item.created_at!==null ?item.created_at:"-",
          ],
        };
      });
    }

    let actions = [];
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary">
                <CustomTableToolbar actions={actions}>
                  <h4 className={classes.cardTitleWhite}>
                    {t("History")}
                  </h4>
                </CustomTableToolbar>
              </CardHeader>
              <CardBody>
                <CustomTable items={items} actions={[]} checkable={false}>
                  <OperationField receiver sender />
                </CustomTable>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <DialogActions>
          {(account_operations.page + 1) * account_operations.per_page <
            account_operations.total && (
            <Button
              onClick={fetchNext}
              color="primary"
            >
             {t("More")}
            </Button>
          )}
        </DialogActions>
      </React.Fragment>
    );
  
}
