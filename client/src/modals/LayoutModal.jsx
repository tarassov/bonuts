import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Trans } from "react-i18next";

export default class LayoutModal extends React.Component {
  render() {
    const { title, children } = this.props;
    return (
      <React.Fragment>
        <div ref={(el) => (this.componentRef = el)}>
          <DialogTitle id="modal_dialog">
            <Trans>{title}</Trans>
          </DialogTitle>
          <DialogContent>{children}</DialogContent>
        </div>
      </React.Fragment>
    );
  }
}
