import StandartList from "components/base/list/StandartList";
import React, {useEffect} from "react";
import { useApi } from "hooks/useApi";
import pluginsApi from "api/listApi/pluginsApi";
import { useSelector} from "react-redux";
import {useModal} from "hooks/useModal";
import {EDIT_PLUGIN} from "modals/modalList";

export default function SchedulersLayout(props){
    
  const {fetchNext} = useApi(pluginsApi,{page: 1, filter:{}})
  const plugins = useSelector((state) => state.plugins)
  const {showModal} = useModal(EDIT_PLUGIN)
  
  const onPluginAdd = () => {
    showModal({})
  }

  const onPluginEdit = (item) => {
    var settings_hash = {};
    item.settings.forEach((property) => {
      settings_hash[property.name] = property.value;
    });
    showModal({...item, ...settings_hash});
  }


  return(
      <StandartList
        list={plugins}
        editItem={onPluginEdit}        
        getValues={(item) => {
          return [item.name];
        }}
      />
  )
}