export const initialstate = null;
export const UserReducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  } else if (action.type === "CLEAR") {
    return null;
  } else {
    return state;
  }
};
