// store/reducers/index.js
import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { authStatusReducer } from "./reducers/authStatusReducer";
import { cartDrawerReducer } from "./reducers/cartDrawerReducer";
import { userReducer } from "./reducers/userDataReducer";
import { cartReducer } from "./reducers/cartCountReducer";
import { CODReducer } from "./reducers/CODreducer";
import { favReducer } from "./reducers/favouritesReducer";

const rootReducer = combineReducers({
  authDialog: authDialogReducer, // Combine your reducers here
  signupStatus: authStatusReducer,
  cartDrawer: cartDrawerReducer,
  cartCount: cartReducer,
  favCount: favReducer,
  COD: CODReducer,
  user: userReducer,
});

export default rootReducer;
