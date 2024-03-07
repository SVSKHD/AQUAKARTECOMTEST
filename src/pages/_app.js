import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/user.module.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Toaster } from "react-hot-toast";
import rootReducer from "@/Store";
import { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Function to initialize gtag
    function gtag() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    }

    // Check if script is already loaded
    if (!window.gtag) {
      // Create script element
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-FS41RRVRD4`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize dataLayer and configure gtag
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-FS41RRVRD4");
      };
    }

    // Route change handler
    const handleRouteChange = (url) => {
      window.gtag("config", "G-FS41RRVRD4", {
        page_path: url,
      });
    };

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    // Cleanup on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </PersistGate>
    </Provider>
  );
}
