import React, { useContext } from "react";

import CustomTableItemContext from "components/base/table/customTableItemContext";
import OperationContainer from "containers/OperationContainer";

function OperationField(props) {
  const context = useContext(CustomTableItemContext);
  const item  = context;
  console.log(item)
  return <OperationContainer operation={item.operation} {...props} />;
}

export default OperationField;
