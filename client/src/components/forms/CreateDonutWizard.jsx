import React from "react";
import PropTypes from "prop-types";
import Wizard from "components/base/wizard/Wizard";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import { useTranslation } from "react-i18next";
import Step1 from "./CreateDonutSteps/CreateDonutStep1";


export default function CreateDonutWizard({addItem}) {

  
  const { t } = useTranslation();
  return (
    <GridContainer justifyContent="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          color="primary"  
          validate
          steps={[
            { stepName: "Data", stepComponent: Step1, stepId: "data" },
          ]}
          title={t("Create new donut")}
          subtitle={t("Main donut information")}
          finishButtonClick={(e) => addItem(e.data)}
        />
      </GridItem>
    </GridContainer>
  );
}

CreateDonutWizard.propTypes = {
  addItem: PropTypes.func,
}