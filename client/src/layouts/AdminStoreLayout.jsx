import React, { useCallback,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from 'react-redux'
import { push } from "connected-react-router";

import { loadStore} from "actions/storeActions";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import Card from "components/base/card/Card";
import CardIcon from "components/base/card/CardIcon";
import CardHeader from "components/base/card/CardHeader";
// @material-ui/icons
import CardBody from "components/base/card/CardBody";
import ReactTable from "components/base/table/ReactTable";



import { cardTitle } from "assets/jss/baseStyles";
import Button from "components/base/customButtons/Button";
import { Store,Edit} from "@material-ui/icons";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    display: "inline",
    marginBottom: "0px",
  },
  addButton: {
    position: "flex",
    marginTop: "10px",
    float: "right",
  }
};


const useStyles = makeStyles(styles);

export default function AdminStoreLayout(props)  {
 

    const classes = useStyles();
    const { t } = useTranslation();

    const dispatch = useDispatch()

    useEffect(()=>{
      console.log(props);
      dispatch(loadStore())
    }, []);

    const store = useSelector((state) => state.store)
    

    const newItem = useCallback(() => {
        dispatch(push('/donut_wizard'));
    }, []);

    const editItem = useCallback((item) => {
       dispatch(push('/donut/'+item.id));
    }, []);


    const data = 
        store.items.map((item, key) => {
          return {
            key: key,
            id: item.id,
            name: item.name,
            price: item.price,
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = data.find((o) => o.key === key);
                    editItem(obj)                   
                  }}
                  color="warning"
                  className="edit"
                >
                  <Edit />
                </Button>{" "}              
              </div>
            ),
          };
        })


    return (
        <GridContainer>
            <GridItem xs={12}>    
                <Card>
                    <CardHeader color="primary" icon>
                    <CardIcon color="primary">
                      <Store />
                    </CardIcon>
                    <div>
                    <h4 className={classes.cardIconTitle}>{t("Store")}</h4>
                    <Button color="secondary" className={classes.addButton} onClick={newItem}>
                        {t("New item")}
                    </Button>
                </div>
                </CardHeader>
                <CardBody>                   
                    <ReactTable
                    columns={[
                        {
                        Header: t("Donut name"),
                        accessor: "name",
                        },
                        {
                        Header: t("Price"),
                        accessor: "price",
                        },
                        {
                        Header: "",
                        accessor: "actions",
                        },
                    ]}
                    data={data}
                    />
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
    )
}

