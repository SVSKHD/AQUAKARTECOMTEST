export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    case "UPDATE_USER_DETAILS":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "UPDATE_SELECTED_ADDRESS":
      return {
        ...state,
        user: {
          ...state.user,
          selectedAddress: action.payload.selectedAddress,
        },
      };
    case "UPDATE_ADDRESSES":
      return {
        ...state,
        user: {
          ...state.user,
          addresses: action.payload.addresses,
        },
      };
    default:
      return state;
  }
};
