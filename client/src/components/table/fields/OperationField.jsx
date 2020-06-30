import React, {useContext} from 'react'

import CustomTableItemContext from 'components/table/customTableItemContext'
import OperationText from "components/OperationText";


function OperationField(props) {
  const item = useContext(CustomTableItemContext)
  const {operation} = item;
  return(
    <OperationText operation = {operation} {...props}/>
  )
}

export default OperationField