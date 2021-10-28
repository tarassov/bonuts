import { connect } from "react-redux";
import React from "react";
import Progress from "components/Progress";

const mapStateToProps = (state) => {
  return {
    system: state.system,
  };
};

class SystemProgress extends React.Component {
  render() {
    return (
      <div>
        {this.props.system.isWaiting && (
          <Progress waitingText={this.props.system.waitingText} />
        )}
      </div>
    );
  }
}

const ProgressContainer = connect(mapStateToProps)(SystemProgress);

export default ProgressContainer;
