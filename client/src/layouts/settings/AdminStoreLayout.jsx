import React, { useCallback,useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from 'react-redux'
import { push } from "redux-first-history";

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
import Button from "components/base/customButtons/RegularButton";
import { Store,Edit} from "@material-ui/icons";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel } from "components/base/tabs/TabPanel";

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
      dispatch(loadStore(true))
    }, [dispatch]);

    const store = useSelector((state) => state.store)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
 
  

    const newItem = useCallback(() => {
        dispatch(push('/donut_wizard'));
    }, [dispatch]);

    const editItem = useCallback((id) => {
       dispatch(push('/donut/'+id));
    }, [dispatch]);

    function a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }

    const getData = (active)=>{
      return store.items.filter(item=>item.active === active).map((item, key) => {
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
                     editItem(item.id)                   
                }}
                color="primary"
                className="edit"
              >
                <Edit />
              </Button>{" "}              
            </div>
          ),
        };
      })
    }

    const data = useMemo(()=>getData(true),[store.items]);
    const notActiveData = useMemo(()=>getData(false),[store.items]);

    return (
        <GridContainer>
            <GridItem xs={12}>    
                <Card>                  
                    <CardHeader color="primary" icon>                      
                    <CardIcon color="primary">
                      <Store />
                    </CardIcon>
                    <div>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label={t("Active donuts")} {...a11yProps(0)} />
                      <Tab label={t("Not active donuts")} {...a11yProps(1)} />
                    </Tabs>
                    <h4 className={classes.cardIconTitle}>{t("Store")}</h4>
                    <Button color="secondary" className={classes.addButton} onClick={newItem}>
                        {t("New item")}
                    </Button>
                </div>
                </CardHeader>                
                <CardBody>   
                  <TabPanel value={value} index={0}>    
                           
                    {data && <ReactTable
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
                    />} 
                    </TabPanel>
                    <TabPanel value={value} index={1}>           
                              
                    {notActiveData && <ReactTable
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
                    data={notActiveData}
                    />} 
                    </TabPanel>
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
    )
}

