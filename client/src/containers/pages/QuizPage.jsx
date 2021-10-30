import { connect } from "react-redux";
import QuizLayout from "layouts/QuizLayout";

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLoad: () => {},
    onSubmit: (item) => {
      console.log(item);
    },
  };
};

const mapStateToProps = (state, props) => {
  return {
    profile: state.profile,
    quiz_id: props.match.params.id,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizLayout);
