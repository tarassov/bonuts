import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import CustomTableToolbar from "components/base/table/CustomTableToolbar";
import DialogActions from "@material-ui/core/DialogActions";

import listStyle from "assets/jss/layouts/listStyle";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import OperationField from "components/OperationField";

import { useApi } from "hooks/useApi";
import requestsApi from "api/listApi/requestsApi";
import RequestField from "components/RequestField";

const useStyles = makeStyles(listStyle)

export default function IncomingRequestsLayout(props) {
  
  
  const { id } = useParams();

  const classes = useStyles()

  const {t} = useTranslation()

  const {fetchNext} = useApi(requestsApi,{page: 1, filter:{status: 0}})

  const requests = useSelector((state) => state.requests)


   
  let items = [];
   if (
      requests !== undefined &&
      requests.items !== undefined
   ) {
      items = requests.items.map((item) => {
        return {
          id: item.id,
          donut: item.donut,
          profile: item.profile,
          name: item.name,
          created_at: item.created_at !== null ? item.created_at : "-",
          updated_at: item.updated_at !== null ? item.updated_at : "-",
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
                    {t("Requests")}
                  </h4>
                </CustomTableToolbar>
              </CardHeader>
              <CardBody>
                <CustomTable items={items} actions={[]} checkable={false}>
                  <RequestField/>
                </CustomTable>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <DialogActions>
          {(requests.page + 1) * requests.per_page <
            requests.total && (
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
