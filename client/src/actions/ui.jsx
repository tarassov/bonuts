export const REDIRECT = "REDIRECT";

// action creators
export const redirect = (link,data, push=false) => {
  console.log("=== REDIRECT ACTION DISPATCHED ===");
  return { type: REDIRECT, payload: link, data: data, push: push};
};
