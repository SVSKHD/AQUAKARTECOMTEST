import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Toaster } from "react-hot-toast";
import rootReducer from "@/Store";
import { useEffect } from "react";

const Store = createStore(rootReducer);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart) {
      Store.dispatch(initializeCart(existingCart));
    }
  });
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </Provider>
  );
}
