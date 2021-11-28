import React, {useEffect} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { useParams } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Print from "@material-ui/icons/Print";
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
  const { regards } = props;
  const params = useParams()

  useEffect(() => {
    props.loadRegards(params.id);
  }, [params.id])



   const redirectToStore = () => {
     props.onRedirectToStore();
   }
    
    let items = regards.items.map((item) => {
      return {
        id: item.id,
        public_uid: item.public_uid,
        name: item.name,
        status: item.status,
        values: [item.donut_name],
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
                  <Trans>Regards i can use</Trans>
                </h4>
              </CustomTableToolbar>
            </CardHeader>
            <CardBody>
              <CustomTable
                items={notActivatedItems(items)}
                actions={[                 
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
                  <Trans>Already used regards</Trans>
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


