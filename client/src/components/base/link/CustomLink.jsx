import { Link } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import RegularButton from "../customButtons/RegularButton";

export default function CustomLink ( {children,path,className}) {
    return(
        <RegularButton simple size="sm" color="primary" to="/donuts" className = {className} component={RouterLink}>{children}</RegularButton>
    )
}