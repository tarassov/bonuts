import ChildPathMenu from "components/ChildPathMenu";
import React, {  } from "react";
import { settingsPath } from "routes/pathes/settingsPath";



export default function SettingsMenuLayout(props)  { 
    return (
        <ChildPathMenu parent = {settingsPath}/>
    )
}

