import React, { useCallback, useEffect, useState } from "react";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";

import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "components/base/customInput/CustomInput";
import Button from "components/base/customButtons/RegularButton";
import Search from "@material-ui/icons/Search";

import apis from "api/apiRoot";

import { push } from "redux-first-history";

import ProfileCard from "components/ProfileCard";
import { useApi } from "hooks/useApi";

import { useModal} from "hooks/useModal";

import { PROFILE_EDIT } from "modals/modalList"; 

import profilesLayoutStyle from "assets/jss/layouts/profilesLayoutStyle";

const useStyles = makeStyles(profilesLayoutStyle);


const sortNewest = (a, b) => b.id - a.id;
const sortAbc = (a, b) => {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  // a должно быть равным b
  return 0;
};

export default function ProfilesLayout() {
  const { fetchNext } = useApi(apis.profiles, {});
  const classes = useStyles();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("abc");
  const {showModal: profileModal} = useModal(PROFILE_EDIT)

  const profiles = useSelector((state) =>
    state.profiles.items.filter(
      (profile) => profile.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    )
  );

 
  const onShowProfile = useCallback((profile) => {
    profileModal({...profile, disabled: true})
  }, []);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const onSortAbc = () => {
    setSortType("abc");
  };
  const onSortNewest = () => {
    setSortType("newest");
  };
  const sortFunction = (a, b) => {
    switch (sortType) {
      case "abc":
        return sortAbc(a, b);
      default:
        return sortNewest(a, b);
    }
  };
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
      <Button round color="info" id="abc" size="sm" onClick={onSortAbc}>
        {t("sort by alphabet")}
      </Button>
      <Button round color="info" id="newest" size="sm" onClick={onSortNewest}>
        {t("newest")}
      </Button>
      <GridContainer>
        {profiles.sort(sortFunction).map((profile, key) => {
          return (
            <GridItem xs={12} sm={12} md={6} lg={4} key={key}>
              <ProfileCard profile={profile} onClick={onShowProfile} className={classes.card}/>
            </GridItem>
          );
        })}
      </GridContainer>
    </section>
  );
}
