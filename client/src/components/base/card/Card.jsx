import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "assets/jss/components/base/cardStyle.jsx";

const useStyles = makeStyles(styles);

export default function Card(props) {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    raised,
    profile,
    team,
    chart,
    background,
    color,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardRaised]: raised,
    [classes.cardProfile]: profile,
    [classes.cardTeam]: team,
    [classes.cardTeamColor]:
      (team && color !== undefined) || (team && background !== undefined),
    [classes.cardChart]: chart,
    [classes[color]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  team: PropTypes.bool,
  raised: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  background: PropTypes.bool,
  color: PropTypes.oneOf([
    "primary",
    "primaryLight",
    "secondary",
    "secondaryLight",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
};
