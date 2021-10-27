export const REDIRECT = "REDIRECT";

// action creators
export const redirect = link => {
  console.log("=== REDIRECT ACTION DISPATCHED ===");
  return { type: REDIRECT, payload: link };
};