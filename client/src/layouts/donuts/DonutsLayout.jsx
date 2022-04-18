import React, { useCallback,useEffect,useState } from "react";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import { loadStore} from "actions/storeActions";
import donutsLayoutStyle from "assets/jss/layouts/donutsLayoutStyle";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import DonutCard from  "components/DonutCard"
import { useDispatch,useSelector  } from 'react-redux'
import CustomInput from "components/base/customInput/CustomInput";
import Button from "components/base/customButtons/RegularButton"
import { push } from "redux-first-history";


const useStyles = makeStyles(donutsLayoutStyle);

const sortPriceAsc =(a,b)=>a.price-b.price
const sortPriceDesc =(a,b)=>b.price-a.price
const sortNewest =(a,b)=>new Date(b.created_at)-new Date(a.created_at)
const sortAbc =(a,b)=>{

    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  };

export default function DonutsLayout()  {
 
 
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("")
    const [sortType, setSortType] = useState("newest")
  

    const dispatch = useDispatch()

    const donuts = useSelector((state) => state.store.items.filter((donut) => donut.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0))


   
    useEffect(()=>{
        dispatch(loadStore())
    },[dispatch]);

   
    const onShowDonut = useCallback((donut) => {
        dispatch(push('/d/'+donut.id));
      }, [])


    const handleChange = (event) =>{       
        setSearchText(event.target.value )
    }
    const onSortAsc = () =>{
        setSortType("asc")
    }
    const onSortDesc = () =>{
        setSortType("desc")
    }
    const onSortAbc = () =>{
        setSortType("abc")
    }
    const onSortNewest = () =>{
        setSortType("newest")
    }
    const sortFunction = (a,b)=>{
        switch(sortType){
            case "asc": return sortPriceAsc(a,b)
            case "desc": return sortPriceDesc(a,b)
            case "abc": return sortAbc(a,b)
            default: return sortNewest(a,b)
        }

    }
    return (
       <section>
        <CustomInput
        formControlProps={{
            fullWidth: true,
            className: classes.top + " " + classes.search,
        }}
        id="search"
        inputProps={{
            placeholder: t("Search"),
            onChange: handleChange,
            inputProps: {
                "aria-label": t("Search"),
                className: classes.searchInput,
            },
        }}
        />
       <Button round color="info" id="asc" size="sm" onClick={onSortAsc}>{t("price asc")}</Button>
       <Button round color="info" id="desc" size="sm" onClick={onSortDesc}>{t("price desc")}</Button>
       <Button round color="info" id="abc" size="sm" onClick={onSortAbc}>{t("sort by alphabet")}</Button>
       <Button round color="info" id="newest" size="sm" onClick={onSortNewest}>{t("newest")}</Button>
      <GridContainer>
        {
            donuts.sort(sortFunction).map((donut, key) => {
                return(
                    <GridItem xs={12} sm={4} md={4} key={key}>
                        <DonutCard donut={donut} onClick={onShowDonut}/>
                    </GridItem>
                )             
           })
        }         
      </GridContainer>
      </section>
    )
}
