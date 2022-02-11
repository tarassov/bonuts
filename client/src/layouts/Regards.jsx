import React, {useEffect} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { useParams } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/styles";


// @material-ui/icons

import Store from "@material-ui/icons/Store";


import CustomTable from "components/base/table/CustomTable";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";
import RequestField from "components/RequestField";

import Card from "components/base/card/Card.jsx";
import CardHeader from "components/base/card/CardHeader.jsx";
import CardBody from "components/base/card/CardBody.jsx";
import { Trans } from "react-i18next";

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

const useStyles = makeStyles(listStyle)

export default function Regards(props) {

  const classes = useStyles()
  const { requests } = props;
  const params = useParams()

  useEffect(() => {
    props.loadRegards(params.id);
  }, [params.id])



   const redirectToStore = () => {
     props.onRedirectToStore();
   }
    
    let items = requests.items.map((item) => {
      return {
        id: item.id,
        donut: item.donut,
        profile: item.profile,
        name: item.name,
        status: item.status,
        created_at: item.created_at !== null ? item.created_at : "-",
        updated_at: item.updated_at !== null ? item.updated_at : "-",
        values: [
          // item.created_at!==null ?item.created_at:"-",
        ],
      };
    });

    let actions = [
      {
        id: "redirectToStore1",
        label: "Add",
        icon: <Store className={classes.tableActionButtonIcon} />,
        onClick: redirectToStore,
      },
    ];

    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="primary">
              <CustomTableToolbar actions={actions}>
                <h4 className={classes.cardTitleWhite}>
                  <Trans>Requests in progress</Trans>
                </h4>
              </CustomTableToolbar>
            </CardHeader>
            <CardBody>
              <CustomTable
                items={notActivatedItems(items)}
                actions={[                 
                ]}
                checkable={false}
              >
               <RequestField/>
              </CustomTable>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="secondary">
              <CustomTableToolbar>
                <h4 className={classes.cardTitleWhite}>
                  <Trans>Closed requests</Trans>
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


