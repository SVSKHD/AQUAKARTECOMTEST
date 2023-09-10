// store/reducers/index.js
import { combineReducers } from 'redux';
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import {authStatusReducer} from "./reducers/authStatusReducer"
import {cartReducer} from "./reducers/cartDrawer"
const rootReducer = combineReducers({
    authDialog: authDialogReducer,// Combine your reducers here
    authStatus:authStatusReducer,
    cartDrawer:cartReducer
});

export default rootReducer;
