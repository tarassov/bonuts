import React from "react";
import AppPath from "routes/appPath";
import QuizPage from "containers/pages/QuizPage";

export const quizPath = new AppPath({
  path: "/quiz/:id",
  anonymous: false,
  authenticated: true,
  active: true,
  hideInMenu: true,
  component: <QuizPage/>,
});
