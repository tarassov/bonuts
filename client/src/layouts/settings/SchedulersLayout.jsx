import StandartList from "components/base/list/StandartList";
import React, {useEffect} from "react";
import { useApi } from "hooks/useApi";
import ScheduilersApi from "api/listApi/schedulersApi";
import { useSelector} from "react-redux";
import {useModal} from "hooks/useModal";
import {EDIT_SCHEDULER} from "modals/modalList";

export default function SchedulersLayout(props){
    
  const {fetchNext} = useApi(ScheduilersApi,{page: 1, filter:{}})
  const schedulers = useSelector((state) => state.schedulers)
  const {showModal} = useModal(EDIT_SCHEDULER)
  
  const onSchedulerAdd = () => {
    showModal({})
  }

  const onSchedulerEdit = (item) => {
    showModal(item);
  }


  return(
      <StandartList
        list={schedulers}
        addItem={onSchedulerAdd}
        editItem={onSchedulerEdit}        
        getValues={(item) => {
          return [item.comment];
        }}
      />
  )
}