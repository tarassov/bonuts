import React from "react";
const CustomTableItemContext = React.createContext({ item: {} });
export const CustomTableItemProvider = CustomTableItemContext.Provider;
export default CustomTableItemContext;
