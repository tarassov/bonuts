import * as notifierActions from "actions/notifierActions";

export const defaultCallback = {
  success: (dispatch, name, action) => {
    dispatch(
      notifierActions.enqueueSnackbar({
        message: name + " " + action,
        options: {
          variant: "success",
        },
      })
    );
  },
};
