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
import { compareReducer } from "./reducers/compareReducer";
import { favDrawerReducer } from "./reducers/favDrawerReducer";
import { userDialogReducer } from "./reducers/userPhoneDialog";

const rootReducer = combineReducers({
  authDialog: authDialogReducer, // Combine your reducers here
  signupStatus: authStatusReducer,
  cartDrawer: cartDrawerReducer,
  favDrawer: favDrawerReducer,
  cartCount: cartReducer,
  favCount: favReducer,
  compareCount: compareReducer,
  COD: CODReducer,
  user: userReducer,
  userPhone: userDialogReducer,
});

export default rootReducer;
