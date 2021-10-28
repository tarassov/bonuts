import React from "react";

// core components
import Wizard from "components/base/wizard/Wizard";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";

import Step1 from "./CreateDonutSteps/CreateDonutStep1";


export default function CreateDonutWizard() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "Data", stepComponent: Step1, stepId: "about" },
          ]}
          title="Build Your Profile"
          subtitle="This information will let us know more about you."
          finishButtonClick={(e) => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
