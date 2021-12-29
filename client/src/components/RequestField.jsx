import React, { useContext } from "react";

import CustomTableItemContext from "components/base/table/customTableItemContext";
import OperationContainer from "containers/OperationContainer";

function RequestField(props) {
  const context = useContext(CustomTableItemContext);
  const { item } = context;
  return <OperationContainer operation={item} {...props} />;
}

export default RequestField;
