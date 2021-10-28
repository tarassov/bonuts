import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import styles from "assets/jss/components/base/cardBodyStyle.jsx";
const useStyles = makeStyles(styles);

export default function CardBody(props) {
  const { className, children, plain, color, profile, team, ...rest } = props;
  const classes = useStyles();
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodyTeam]: team,
    [classes.cardBodyColor]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  color: PropTypes.bool,
  team: PropTypes.bool,
};
