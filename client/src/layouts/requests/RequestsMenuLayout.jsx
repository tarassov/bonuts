import ChildPathMenu from "components/ChildPathMenu";
import React from "react";
import { requestsPath } from "routes/pathes/requests/requestsPath";



export default function RequestsMenuLayout(props)  { 
    return (
        <ChildPathMenu parent = {requestsPath}/>
    )
}

