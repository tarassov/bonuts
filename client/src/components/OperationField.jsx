import React, {useContext} from 'react'

import CustomTableItemContext from 'components/base/table/customTableItemContext'
import OperationContainer from 'containers/OperationContainer';


function OperationField(props) {
  const item = useContext(CustomTableItemContext)
  const {operation} = item;
  return(
    <OperationContainer operation = {operation} {...props}/>
  )
}

export default OperationField