import React, {useContext} from 'react'

import CustomTableItemContext from 'components/table/customTableItemContext'
import OperationText from "components/OperationText";
import OperationContainer from 'containers/OperationContainer';


function OperationField(props) {
  const item = useContext(CustomTableItemContext)
  const {operation} = item;
  return(
    <OperationContainer operation = {operation} {...props}/>
  )
}

export default OperationField