export const userDialogReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_USER_PHONE_DIALOG_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};
